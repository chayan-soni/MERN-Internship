const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/", async (req, res) => {

    const user = await User.create(req.body);

    res.status(201).json(user);
});

router.get("/", async (req, res) => {

    const users = await User.find();

    res.json(users);
});

router.get("/:id", async (req, res, next) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            const error = new Error("User Not Found");
            error.status = 404;

            return next(error);
        }

        res.json(user);

    } catch (err) {

        next(err);
    }
});

module.exports = router;