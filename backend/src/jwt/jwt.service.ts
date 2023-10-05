import { Injectable } from '@nestjs/common';
import { jwtConstants } from './jwt-constants';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  generateToken(payload: any): string {
    return sign(payload, jwtConstants.secret, {
      expiresIn: jwtConstants.expiresIn,
    });
  }

  verifyToken(token: string): any {
    return verify(token, jwtConstants.secret);
  }
}
