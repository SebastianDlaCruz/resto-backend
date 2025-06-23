import { Rol } from '@common/enums';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

interface JWTPayload {
  uuid: string;
  email: string;
  rol: Rol;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(private configServices: ConfigService,
    private authService: AuthService) {
    super({

      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies?.access_token as string || null
      ]),
      secretOrKey: configServices.get('KEY_TOKEN') ?? '',
      ignoreExpiration: false

    })
  }

  async validate(payload: JWTPayload): Promise<unknown> {

    if (!payload.email) throw new UnauthorizedException('Token invalido: falta email esencial')

    const auth = await this.authService.exists(payload.uuid);

    if (!auth) {
      throw new UnauthorizedException('Autorización no existente');
    }

    return { email: payload.email, sub: payload.uuid, rol: payload.rol };

  }


}