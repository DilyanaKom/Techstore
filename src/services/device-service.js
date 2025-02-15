//TODO 
import mongoose from 'mongoose';
import Device from '../models/Device.js';
import { CustomValidationError } from '../utils/error-utils.js';


//function to get the latest 3 entries

export default {
    getNewest(){
        const result = Device.find().sort({ createdAt: -1 }).limit(3);
        return result;
    },
    createDevice(deviceData, ownerId){
        const device = new Device(deviceData);
        const validationErrors = device.validateSync();
        
        if(validationErrors){
            throw new CustomValidationError(Object.values(validationErrors.errors).map(err => err.message));
            
        }
        const result = Device.create({...deviceData, owner: ownerId} );
        return result;

    },
    getAll(fitler = {}){
        const result = Device.find(fitler);
        return result;
    },
    getOne(id){
        const result = Device.findById(id);
        return result;
    },
    async getPreferredList(id){
        const result = (await Device.findById(id).select('preferredList -_id')).preferredList || [];
        return result;

    },
    async addUserToPreferredList(deviceId, userId){
        const updatedDevice = await Device.findByIdAndUpdate(deviceId,
            { $addToSet: {preferredList: userId}},
            {new: true});
        return updatedDevice?.preferredList || [];

    },
    delete(id){
        return Device.findByIdAndDelete(id);
    },
    update(id, deviceData){
        return Device.findByIdAndUpdate(id, deviceData, {runValidators: true});

    },

}


