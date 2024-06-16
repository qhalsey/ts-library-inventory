import express from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";

const app = express();

app.use(bodyParser.json());

//Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ts-library", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

