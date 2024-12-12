const User = require("../models");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { fullName, email, password, re_pass } = req.body;

  console.log(req.body);
  // if (password !== re_pass) {
  //   return res.status(400).json({ error: "Passwords do not match" });
  // }

  // try {
  //   const existingUser = await User.findOne({ where: { email } });
  //   if (existingUser) {
  //     throw new Error("User already exists");
  //   }

  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const user = await User.create({
  //     fullName,
  //     email,
  //     password: hashedPassword,
  //     membershipStatus: false,
  //   });

  //   res.direct("/login");
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = user.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    const valid = await user.validPassword(password);
    if (!valid) {
      throw new Error("Incorrect password");
    }
    res.json({ message: "Logged in" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
