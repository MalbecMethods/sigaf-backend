import jwt from 'jwt-simple';
import moment from 'moment';
import { envs } from '../environments/environments';

export class TokenService {
    static generateToken(user: any) {
        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix(),
        };
        return jwt.encode(payload, envs.SECRET_TOKEN);
    }
}


