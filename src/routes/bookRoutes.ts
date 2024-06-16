import { Router } from 'express';
import bodyParser from 'body-parser';
import Book from '../models/Book';
import authMiddleware from '../middleware/authMiddleware';
import { JwtPayload } from 'jsonwebtoken';

// Create a router object
const router = Router();

// Parse the request body
router.use(bodyParser.json());
router.use(authMiddleware as any);

/**
 * @route POST /books
 * @description Create a new book
 * @access Public
 */
// Create a new book
router.post('/', async (req, res) => {
    try {
        const { title, author, genre, totalCopies } = req.body;
        const book = new Book({ title, author, genre, totalCopies, availableCopies: totalCopies });
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * @route GET /books
 * @description Get all books
 * @access Public
 */
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * @route POST /checkout/:id
 * @description Checkout a book by ID
 * @access Public
 */
router.post('/checkout/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }
        if (book.availableCopies < 1) {
            return res.status(400).send({ error: 'No available copies' });
        }
        if (book.checkedOutBy) {
            return res.status(400).send({ error: 'Book is already checked out' });
        }

        const userId = (req.user as JwtPayload).id;
        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 14);

        book.availableCopies -= 1;
        book.checkedOutBy = userId;
        book.returnDate = returnDate;
        await book.save();

        res.status(200).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * @route POST /return/:id
 * @description Return a book by ID
 * @access Public
 */
// Return a book
router.post('/return/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }
        if (!book.checkedOutBy) {
            return res.status(400).send({ error: 'Book is not checked out' });
        }

        book.availableCopies += 1;
        book.checkedOutBy = null;
        book.returnDate = null;
        await book.save();

        res.status(200).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
});
/**
 * @route GET /books/:id
 * @description Get a book by ID
 * @access Public
 */
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * @route PATCH /books/:id
 * @description Update a book by ID
 * @access Public
 */
router.patch('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * @route DELETE /books/:id
 * @description Delete a book by ID
 * @access Public
 */
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
