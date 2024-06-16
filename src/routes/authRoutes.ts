import { Router } from 'express';
import User from '../models/User';
import { comparePassword, generateToken } from '../utils/auth';

const router = Router();

// User registration
router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = new User({ username, password, role });
        await user.save();
        const token = generateToken(user._id.toString());
        res.status(201).send({ user, token });
    } catch (error: any) {
        console.log(error);
        if (error.name === 'ValidationError') {
            res.status(400).send({ error: 'Invalid user data' });
        } else {
            res.status(500).send({ error: 'Something went wrong' });
        }
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }
        const token = generateToken(user._id.toString());
        res.send({ user, token });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
