import { Schema, model, Types} from 'mongoose';

const deviceSchema = new Schema(
    {
        brand: {
            type: String,
            required: [true, 'Brand is required!'],
            minLength: [2, 'Brand should be min 2 characters long!']
        },
        model: {
            type: String,
            required: [true, 'Model is required!'],
            minLength: [5, 'Model should be min 5 characters long!']
        },
        hardDisk: {
            type: String,
            required: [true, 'Hard disk is required!'],
            minLength: [5, 'Hard disk should be min 5 characters long!']
        },
        screenSize: {
            type: String,
            required: [true, 'Screen size is required!'],
            minLength: [1, 'Screen size should be min 1 character long!']
        },
        ram: {
            type: String,
            required: [true, 'RAM is required!'],
            minLength: [2, 'RAM should be min 2 characters long!']
        },
        operatingSystem: {
            type: String,
            required: [true, 'Operating system is required!'],
            minLength: [5, 'Operating system should be min 5 characters long!'],
            maxLength: [20, 'Operating system should be max 20 characters long']
        },
        cpu: {
            type: String,
            required: [true, 'CPU is required!'],
            minLength: [10, 'CPU should be min 10 characters long!'],
            maxLength: [50, 'CPU should be max 50 characters long']

        },
        gpu: {
            type: String,
            required: [true, 'GPU is required!'],
            minLength: [10, 'GPU should be min 10 characters long!'],
            maxLength: [50, 'GPU should be max 50 characters long']

        },
        price: {
            type: Number,
            required: [true, 'Price is required!'],
            min: [0, 'Price should be positive number!']
        },
        color: {
            type: String,
            required: [true, 'Color is required!'],
            minLength: [2, 'Color should be min 2 characters long!'],
            maxLength: [10, 'Color should be max 10 characters long']
        },
        weight: {
            type: String,
            required: [true, 'Weight is required!'],
            minLength: [1, 'Weight should be min 1 characters long!']
        },
        image: {
            type: String,
            required: [true, 'Image is required!'],
            match:/^https?:///
        },
        preferredList: [{
            type: Types.ObjectId,
            ref: 'User',
        }],
        owner: {
            type: Types.ObjectId,
            ref: 'User',
        },
    },
    {timestamps: true},
);

const Device = model('Device', deviceSchema);
export default Device; 