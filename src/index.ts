import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ts-library', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
