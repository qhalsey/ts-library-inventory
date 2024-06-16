import mongoose, { Document, Schema } from 'mongoose';

interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    totalCopies: number;
    availableCopies: number;
}

const bookSchema: Schema<IBook> = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    totalCopies: { type: Number, required: true },
    availableCopies: { type: Number, required: true },
});

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
