const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/messages", isAuthenticated, messageController.getAllMessages);
router.post("/messages", isAuthenticated, messageController.createMessage);
router.put("/messages/:id", isAuthenticated, messageController.updateMessage);
router.delete("/messages/:id", isAuthenticated, messageController.deleteMessage);

module.exports = router;
