import User from '../models/User.js';
import brcypt from 'bcrypt';

import { CustomValidationError } from '../utils/error-utils.js';
import { generateToken } from '../utils/token-utils.js';




export default{
    async register(userData){
        //Check if passwords match and if user exists
        const errors = [];
        const passwordMatch = userData.password === userData.confirmPassword;
        if(!passwordMatch){
            errors.push('Passwords don\'t match');
        };

        const userExists = await User.exists({email: userData.email});
        
        if(userExists){
            errors.push('Email already exists!');
        };
      
        if(errors.length > 0){
            throw new CustomValidationError(errors);
        }

        const createdUser = await User.create(userData);
        const token = generateToken(createdUser);
        return token;
    },
    async login(email, password){
        //check if email exists
        const user = await User.findOne({email});
        if(!user){
            throw new Error('Invalid email or password!');
        };

        //check if password is correct
        const isValid = await brcypt.compare(password, user.password);

        if(!isValid){
            throw new Error('Invalid email or password!');
        }

        const token = generateToken(user);
        return token;
    }
}

