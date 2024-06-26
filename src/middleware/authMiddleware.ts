import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).send({ error: 'Invalid token.' });
    }

    req.user = decoded;
    next();
};

export default authMiddleware;
