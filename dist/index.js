"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
//Connect to MongoDB
mongoose_1.default.connect("mongodb://localhost:27017/ts-library", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use('/api/users', userRoutes_1.default);
app.use('/api/books', bookRoutes_1.default);
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
