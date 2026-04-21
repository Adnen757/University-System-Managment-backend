import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

type JwtPayload = {
  sub: string;
  username: string;
  role: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    const jwtaccessSecret = configService.get<string>('JWT_ACCESS_SECRET');
    if (!jwtaccessSecret) {
      throw new Error("JWT access secret is not found in environment")
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtaccessSecret,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}