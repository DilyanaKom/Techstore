import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants.js';

export function generateToken(user){
         //generate token
            const payload = {
                id: user._id,
                email: user.email,
            };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h'});
    
            //return token
            return token;
}