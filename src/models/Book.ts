import mongoose, { Document, Schema } from 'mongoose';

interface IBook extends Document {
    title: string;
    genre: string;
    quantity: number;
}

const bookSchema = new Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    quantity: { type: Number, required: true }
});

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;

