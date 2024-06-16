import mongoose, { Document, Schema } from 'mongoose';
import { hashPassword } from '../utils/auth';

interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    role: string;
}

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, required: true },
});

// Pre-save hook to hash the password before saving
userSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hashPassword(this.password);
    }
    next();
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
