import mongoose, { Document, Schema } from 'mongoose';

interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    totalCopies: number;
    availableCopies: number;
    checkedOutBy: mongoose.Types.ObjectId | null;
    returnDate: Date | null;
}

// Define the Book schema
const bookSchema: Schema<IBook> = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    totalCopies: { type: Number, required: true },
    availableCopies: { type: Number, required: true },
    checkedOutBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    returnDate: { type: Date, default: null },
});
const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
