import { Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },

});

userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);
export default User;