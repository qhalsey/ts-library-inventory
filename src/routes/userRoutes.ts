import { Router } from "express";
import bodyParser from "body-parser";
import User from "../models/User";

// Create a router object
const router = Router();

// Parse the request body
router.use(bodyParser.json());

/**
 * @route POST /users
 * @description Create a new user
 * @access Public
 */
router.post("/", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * @route GET /users
 * @description Get all users
 * @access Public
 */
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * @route GET /users/:id
 * @description Get a user by ID
 * @access Public
 */
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * @route PATCH /users/:id
 * @description Update a user by ID
 * @access Public
 */
router.patch("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * @route DELETE /users/:id
 * @description Delete a user by ID
 * @access Public
 */
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Export the router object
export default router;