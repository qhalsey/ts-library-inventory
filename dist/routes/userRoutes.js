"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const User_1 = __importDefault(require("../models/User"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const Book_1 = __importDefault(require("../models/Book"));
// Create a router object
const router = (0, express_1.Router)();
// Parse the request body
router.use(body_parser_1.default.json());
router.use(authMiddleware_1.default);
/**
 * @route POST /users
 * @description Create a new user
 * @access Public
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User_1.default(req.body);
        yield user.save();
        res.status(201).send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
/**
 * @route GET /users
 * @description Get all users
 * @access Public
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.send(users);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
/**
 * @route GET /users/:id
 * @description Get a user by ID
 * @access Public
 */
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
/**
 * @route PATCH /users/:id
 * @description Update a user by ID
 * @access Public
 */
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
/**
 * @route DELETE /users/:id
 * @description Delete a user by ID
 * @access Public
 */
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
router.get('/:id/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const books = yield Book_1.default.find({ checkedOutBy: userId });
        res.status(200).send(books);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// Export the router object
exports.default = router;
