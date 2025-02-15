import { Router } from 'express';
import deviceService from '../services/device-service.js';
import { getErrorMessage } from '../utils/error-utils.js';
import { isAuth } from '../middlewares/auth-middleware.js';

const deviceController = Router();

deviceController.get('/create', isAuth, (req, res) => {
    res.render('devices/create', {title: 'Add Offer'});
});

deviceController.post('/create', async (req, res) => {
    const deviceData = req.body;
    const userId = req.user?.id;

    try {
        await deviceService.createDevice(deviceData, userId);
        res.render('devices/catalog');
    } catch (error) {
        
        const errors = getErrorMessage(error);
        return res.render('devices/create', {
            error: errors,
            device: deviceData,
            title: 'Add Offer',
        });
        
    }
    

    //TODO show message if failure and keep data

});

deviceController.get('/catalog', async (req, res) => {

    try {
        const devices = await deviceService.getAll();
        res.render('devices/catalog', {devices});
        
    } catch (error) {
        console.log(error.message); 
    }
    

});


export default deviceController;
