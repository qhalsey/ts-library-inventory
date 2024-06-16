import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
}

const userScema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

const User = mongoose.model<IUser>('User', userScema);
export default User;