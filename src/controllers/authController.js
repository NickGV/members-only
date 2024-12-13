const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { fullName, email, password, re_pass } = req.body;

  if (!fullName || !email || !password || !re_pass) {
    return res.render("signup", { error: "All fields are required" });
  }

  if (password !== re_pass) {
    return res.render("signup", { error: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.render("signup", { error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
      membershipStatus: false,
    });

    res.render("login", { success: "Registration successful. Please log in." });
  } catch (error) {
    res.render("signup", { error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("login", { error: "All fields are required" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.render("login", { error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.render("login", { error: "Incorrect password" });
    }

    req.login(user, (err) => {
      if (err) {
        return res.render("login", { error: err.message });
      }
      return res.redirect("/");
    });
  } catch (error) {
    res.render("login", { error: error.message });
  }
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.render("index", { error: err.message });
    }
    res.redirect("/login");
  });
};