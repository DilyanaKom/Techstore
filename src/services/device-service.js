//TODO 

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

    }
}


