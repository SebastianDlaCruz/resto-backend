import { USER_SERVICES_CREATE_TOKEN } from '@modules/user/const/constants.';
import { IUser } from '@modules/user/interface/user.interface';
import { ConflictException, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entity/auth.entity';
import { Payload } from './interface/payload';
import { CookieService } from './services/cookie/cookie.service';
import { HastService } from './services/hast/hast.service';

@Injectable()
export class AuthService {

  constructor(
    // repository
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,

    // services
    private readonly hashService: HastService,
    private readonly jwtService: JwtService,
    private readonly cookieService: CookieService,
    private readonly configService: ConfigService,
    @Inject(USER_SERVICES_CREATE_TOKEN) private user: IUser) { }


  async signup(auth: CreateAuthDto, res: Response) {

    try {

      const email = await this.authRepository.existsBy({
        email: auth.email
      })

      if (email) {
        throw new ConflictException('El email ya existe');
      }

      const hedPassword = await this.hashService.hashPassword(auth.password);
      if (!hedPassword) {
        throw new InternalServerErrorException('Error al hashear la contraseña');
      }


      const newAuth = this.authRepository.create({
        ...auth,
        password: hedPassword
      });

      // Auth creado en la base de datos
      const save = await this.authRepository.save(newAuth);

      if (!save) {
        throw new InternalServerErrorException('Error al crear el auth');
      }

      await this.user.create(save);

      //GENERACION DE TOKENS
      const payload: Payload = { email: save.email, sub: save.uuid, rol: save.rol };
      const tokens = await this.generateTokens(payload);

      if (!tokens) {
        throw new InternalServerErrorException('Error al crear los tokens')
      }

      this.cookieService.setAuthCookie(res, tokens.accessToken, tokens.refreshToken);

      return res.json({
        statusCode: HttpStatus.CREATED,
        message: 'Auth creado correctamente',
        status: 'success',
      })


    } catch (error) {

      if (error instanceof ConflictException) {
        throw error;
      }

      if (error instanceof InternalServerErrorException) {
        throw error;
      }

    }

  }

  async login(auth: AuthDto, res: Response) {

    try {

      // Validar email
      const authDB = await this.exists(auth.email);
      if (!authDB) {
        throw new NotFoundException('El email no existe');
      }

      const validatePassword = await this.hashService.comparePasswords(auth.password, authDB.password);

      if (!validatePassword) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }


      //GENERACION DE TOKENS
      const payload: Payload = { email: authDB.email, sub: authDB.uuid, rol: authDB.rol };
      const tokens = await this.generateTokens(payload);

      this.cookieService.setAuthCookie(res, tokens.accessToken, tokens.refreshToken);
      return res.json({
        statusCode: HttpStatus.OK,
        message: 'login exitoso',
        status: 'success',
      })

    } catch (error) {

      if (error instanceof ConflictException) {
        throw error;
      }

      if (error instanceof InternalServerErrorException) {
        throw error;
      }

    }
  }


  async refreshToken(refreshToken: string) {

    try {

      const payload: Payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('KEY_REFRESH')
      });

      const auth = await this.exists(payload.email);

      if (!auth) {
        throw new NotFoundException('El usuario no existe')
      }

      const newPayload: Payload = {
        email: auth.email,
        rol: auth.rol,
        sub: auth.uuid
      }

      const tokens = await this.generateTokens(newPayload)

      if (!tokens) {
        throw new InternalServerErrorException('Error al generar los tokens')
      }

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }

    } catch (error) {

      if (error instanceof NotFoundException) {
        throw error
      }


      if (error instanceof InternalServerErrorException) {
        throw error
      }

      throw new InternalServerErrorException('Token invalido o expirado')

    }

  }


  logout(res: Response) {
    this.cookieService.clearCookie(res);

    return res.json({
      statusCode: HttpStatus.OK,
      message: 'logout exitoso',
      status: 'success',

    })

  }

  async exists(email: string): Promise<Auth | null> {
    return this.authRepository.findOne({ where: { email } });
  }


  private async generateTokens(payload: Payload) {


    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('KEY_TOKEN'),
        expiresIn: '1d'
      }),

      this.jwtService.signAsync(payload, {
        secret: this.configService.get('KEY_REFRESH'),
        expiresIn: '7d'
      })
    ])



    return {
      accessToken,
      refreshToken
    }


  }


}
