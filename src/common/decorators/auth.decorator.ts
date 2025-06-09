import { Rol } from "@common/enums";
import { AccessTokenGuard, RolGuard } from "@common/guards";
import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";

export const Auth = (...roles: Rol[]) =>
  applyDecorators(
    UseGuards(AccessTokenGuard),
    SetMetadata('roles', roles),
    UseGuards(RolGuard)
  );