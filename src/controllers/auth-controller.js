import { Router } from 'express';
import authService from '../services/auth-service.js';
import { getErrorMessage } from '../utils/error-utils.js';
import { isAuth } from '../middlewares/auth-middleware.js';

const authController = Router();

authController.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login'});
});

authController.post('/login', async (req, res) => {
    const { email, password} = req.body;

    try {
    
        const token = await authService.login(email, password);
        res.cookie('auth', token, {httpOnly: true});
        res.redirect('/');
        
    } catch (error) {
        return res.render('auth/login', {
            error: getErrorMessage(error),
            title: 'Login',
        });
        
    }
});

authController.get('/register', (req, res) => {
    res.render('auth/register', {title: 'Register'});
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    try {
       const token =  await authService.register(userData);
       res.cookie('auth', token, {httpOnly: true})
        res.redirect('/', {title: 'Register'});
    } catch (error) {
        const errors = getErrorMessage(error);
        return res.render('auth/register', {
            error: errors, 
            user: userData,
            title: 'Register',
        });
    }
    
    
});

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');

})


export default authController;