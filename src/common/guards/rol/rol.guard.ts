import { Rol } from '@common/enums';
import { Payload } from '@modules/auth/interface/payload';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RolGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const requiredRoles = this.reflector.get<Rol[]>(
      'roles',
      context.getHandler()
    ) || [];


    if (requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const auth = request.user as Payload;

    if (!auth) {
      throw new UnauthorizedException('no autenticado');
    }

    if (requiredRoles.includes(auth.rol) || auth.rol === Rol.ADMIN) {
      return true;
    }

    throw new ForbiddenException(`No tienes permisos de ${auth.rol}`)
  }
}
