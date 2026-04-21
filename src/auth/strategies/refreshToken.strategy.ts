import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class refreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh',) {
    constructor(private configService: ConfigService) {
        const JWT_REFRESH_SECRET = configService.get<string>('JWT_REFRESH_SECRET');
        if(!JWT_REFRESH_SECRET){
            throw new Error("JWT_REFRESH_SECRET not found in env") ;
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_REFRESH_SECRET,
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: any) {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            throw new Error("authHeader notfound in env") ;
        }
        const refreshToken = authHeader.replace('Bearer','').trim();
        return{ ...payload, refreshToken }; 
    }
}