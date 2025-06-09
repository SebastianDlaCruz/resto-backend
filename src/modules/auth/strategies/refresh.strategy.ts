import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

  constructor(private readonly configService: ConfigService) {
    super({

      jwtFromRequest: ExtractJwt.fromExtractors([

        (req: Request) => req.cookies?.refresh_token as string,
        ExtractJwt.fromAuthHeaderAsBearerToken()

      ]),

      secretOrKey: configService.get('KEY_REFRESH') ?? ''

    })
  }

  validate(req: Request, payload: any): unknown {

    const cookieRefreshToken = req.cookies?.refresh_token as string;

    const refreshToken = cookieRefreshToken;

    return { ...payload, refreshToken }

  }

}