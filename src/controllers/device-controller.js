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
        return res.redirect('/devices/catalog');
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
deviceController.get('/:deviceId/details', async (req, res) => {
    const deviceId = req.params.deviceId;
    const device = await deviceService.getOne(deviceId);
    const user = req.user;
    if(!user){
        return res.render('devices/details', {device});
    }
    const preferredBy = await deviceService.getPreferredList(deviceId);
    const hasPreferred = preferredBy.includes(req.user.id);
    const isCreator = user && device.owner?.toString() === req.user.id;

    res.render('devices/details', {device, user, isCreator, hasPreferred});
});

deviceController.get('/:deviceId/prefer', async (req, res) => {
    const deviceId = req.params.deviceId;
    const user = req.user;
    const device = await deviceService.getOne(deviceId);
    const isCreator = user && device.owner?.toString() === req.user.id;
    if(!user || isCreator){
            return res.render('404');
    }
    const preferredBy = await deviceService.getPreferredList(deviceId);
    const hasPreferred = preferredBy.includes(req.user.id);

    if(hasPreferred){
        return res.render('404');
    }
     await deviceService.addUserToPreferredList(deviceId, req.user.id);
     res.redirect(`/devices/${deviceId}/details`);
});

deviceController.get('/:deviceId/delete', async (req, res) => {
    const deviceId = req.params.deviceId;
    const device = await deviceService.getOne(deviceId);

    if(!device.owner?.equals(req.user?.id)){
        return res.redirect('/404');
    };

    await deviceService.delete(deviceId);
    res.redirect('/');
});

deviceController.get('/:deviceId/edit', async (req, res) => {
    const deviceId = req.params.deviceId;
    const device = await deviceService.getOne(deviceId);

    if(!device.owner?.equals(req.user?.id)){
        return res.redirect('/404');
    };

    res.render('devices/edit', {device, title: 'Edit'})
});

deviceController.post('/:deviceId/edit', async (req, res) => {
    const deviceId = req.params.deviceId;
    const deviceDetails = req.body;

    try {
        await deviceService.update(deviceId, isAuth, deviceDetails);
        res.render('devices/details', {device: deviceDetails});
    } catch (error) {
        const errors = getErrorMessage(error);
        return res.render('devices/edit', {
            error: errors,
            device: deviceDetails,
            title: 'Edit',
        });
        
    }



});



export default deviceController;
