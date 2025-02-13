import { Router } from 'express';
import deviceService from '../services/device-service.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    const devices = await deviceService.getNewest();
    //console.log(devices);

    res.render('home');
});

export default homeController;