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

  async update(user: UserDto, uuid: string, res: Response) {

    try {

      const exist = await this.exist(uuid);

      if (!exist) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const update = await this.userRepository.update({
        uuid: uuid
      }, {
        address: user.address,
        username: user.username,
        number: user.number,
        floor: user.floor,
        contact: user.contact,
        postal_code: user.postal_code,
        clarification: user.clarification
      })

      if (!update) {
        throw new InternalServerErrorException('Error al actualizar los datos');
      }

      return res.json({
        statusCode: HttpStatus.OK,
        message: 'Usuario actualizado',
        status: 'success'
      })


    } catch (error) {

      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof InternalServerErrorException) {
        throw error
      }

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
        user
      })


    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
    }
  }


  existUuidAuth(uuid: string) {
    return this.userRepository.findOne({
      where: {
        auth: {
          uuid
        }
      },
    })
  }

  async exist(uuid: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        uuid
      },
    })
  }
}



