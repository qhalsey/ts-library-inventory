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
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../utils/auth");
const router = (0, express_1.Router)();
// User registration
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, role } = req.body;
        const user = new User_1.default({ username, password, role });
        yield user.save();
        const token = (0, auth_1.generateToken)(user._id.toString());
        res.status(201).send({ user, token });
    }
    catch (error) {
        console.log(error);
        if (error.name === 'ValidationError') {
            res.status(400).send({ error: 'Invalid user data' });
        }
        else {
            res.status(500).send({ error: 'Something went wrong' });
        }
    }
}));
// User login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield User_1.default.findOne({ username });
        if (!user || !(yield (0, auth_1.comparePassword)(password, user.password))) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }
        const token = (0, auth_1.generateToken)(user._id.toString());
        res.send({ user, token });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = router;
