import { Router } from 'express';
import deviceService from '../services/auth-service.js';
import { getErrorMessage } from '../utils/error-utils.js';
import { isAuth } from '../middlewares/auth-middleware.js';

const deviceController = Router();

deviceController.get('/create', isAuth, (req, res) => {
    res.render('devices/create');
});

export default deviceController;
