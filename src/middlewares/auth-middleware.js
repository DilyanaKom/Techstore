import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants.js';


export const auth = (req, res, next) => {
    const token = req.cookies['auth'];

    if(!token){
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET)
        req.user = decodedToken;
        res.locals.user = decodedToken;
       
    } catch (error) {
        res.clearCookie('auth');
        return res.redirect('/auth/login');
    }
    next();
}

export const isAuth = (req, res, next) => {
    if(!req.user){
        return res.redirect('auth/login');
    }

    next();
}