const router = require("express").Router();
const userRoutes = require("./users");
const postRoutes = require("./posts");
const courseRoutes = require("./courses");
const authRoutes = require("./auth");
const uploadRoutes = require("./upload");

// routes
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/courses", courseRoutes);
router.use("/auth", authRoutes);
router.use("/upload", uploadRoutes);

module.exports = router;
