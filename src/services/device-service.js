//TODO 

import Device from '../models/Device.js';
import { CustomValidationError } from '../utils/error-utils.js';


//function to get the latest 3 entries

export default {
    getNewest(){
        const result = Device.find().sort({ createdAt: -1 }).limit(3);
        return result;
    }
}


