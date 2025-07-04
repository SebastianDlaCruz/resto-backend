import { Auth } from '@modules/auth/entity/auth.entity';
import { Payload } from '@modules/auth/interface/payload';
import { ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { IUser } from './interface/user.interface';
import { User } from './user.entity';

@Injectable()
export class UserService implements IUser {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>

  ) { }

  searchForAuth(uuidAuth: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        auth: {
          uuid: uuidAuth
        }
      }
    })
  }


  async create(auth: Auth) {

    try {

      const user = await this.userRepository.findOne({
        where: {
          auth: {
            uuid: auth.uuid
          }
        }
      })

      if (user) {
        throw new ConflictException('Usuario existente');
      }


      const newUser = this.userRepository.create({
        auth,
      })


      const save = await this.userRepository.save(newUser);


      if (!save) {
        throw new InternalServerErrorException('Error al crear el usuario');
      }

    } catch (error) {

      if (error instanceof ConflictException) {
        throw error;
      }

      if (error instanceof InternalServerErrorException) {
        throw error;
      }
    }
  }

  async update(user: UserDto, uuid: string) {

    try {

      const exist = await this.exist(uuid);

      if (!exist) {
        throw new NotFoundException('Usuario no encontrado');
      }

      await this.userRepository.update({
        uuid: exist.uuid
      }, user);


      return {
        statusCode: HttpStatus.OK,
        message: 'Usuario actualizado'
      }


    } catch (error) {

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Error al actualizar los datos');

    }
  }


  async getUser(res: Response, auth: Payload) {
    try {

      if (!auth) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const user = await this.userRepository.findOne({
        where: {
          auth: { uuid: auth.sub }
        }
      })


      return res.json({
        statusCode: HttpStatus.OK,
        message: 'Usuario encontrado',
        data: user
      })


    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
    }
  }


  async exist(uuid: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        uuid
      },
    })
  }
}



