const { Message } = require("../models");
const { User } = require("../models");

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({ include: "User" });
    res.render("messages", { user: req.user, messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMessage = async (req, res) => {
  const { title, text } = req.body;
  const userId = req.user.id;

  try {
    await Message.create({ title, text, userId, timestamp: new Date() });
    res.redirect("/messages");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.updateMessage = async (req, res) => {
  const { id } = req.params;
  const { title, text } = req.body;

  try {
    await Message.update({ title, text }, { where: { id } });
    res.redirect("/messages");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    await Message.destroy({ where: { id } });
    res.redirect("/messages");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
