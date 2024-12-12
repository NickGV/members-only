const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/signup", (req, res) => res.render("signup"));
router.get("/login", (req, res) => res.render("login"));
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
