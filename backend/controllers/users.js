const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");

const users = require("../models/users");

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).send("Could not create an user!");
  }

  const newUser = {
    id: v4(),
    name,
    email,
    password: hashedPassword,
  };

  try {
    const exist = await users.findByEmail(newUser.email);
    if (exist.length > 0) {
      return res.status(422).send("User already exists!");
    }

    const result = await users.create(newUser);
    if (!result) {
      return res.status(500).send("Could not create an user!");
    }

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      token,
    });
  } catch (err) {
    return res.status(500).send("Could not create user!");
  }
};

module.exports = {
  signUpUser,
};
