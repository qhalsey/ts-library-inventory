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
const Book_1 = __importDefault(require("../models/Book"));
// Create a router object
const router = (0, express_1.Router)();
// Parse the request body
router.use(body_parser_1.default.json());
/**
 * @route POST /books
 * @description Create a new book
 * @access Public
 */
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new Book_1.default(req.body);
        yield book.save();
        res.status(201).send(book);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
/**
 * @route GET /books
 * @description Get all books
 * @access Public
 */
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Book_1.default.find();
        res.send(books);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
/**
 * @route GET /books/:id
 * @description Get a book by ID
 * @access Public
 */
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_1.default.findById(req.params.id);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.send(book);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
/**
 * @route PATCH /books/:id
 * @description Update a book by ID
 * @access Public
 */
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_1.default.findByIdAndUpdate(req.params);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.send(book);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
/**
 * @route DELETE /books/:id
 * @description Delete a book by ID
 * @access Public
 */
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_1.default.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.send(book);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = router;
