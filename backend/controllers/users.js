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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let identifieduser;
  try {
    const result = await users.findByEmail(email);
    if (!result[0]) {
      return res.status(400).send("No users found");
    }
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, identifieduser.password);
    if (!isValidPassword) {
      return res.status(401).send("No user found");
    }
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }

  try {
    const token = jwt.sign(
      {
        id: identifieduser.id,
        email: identifieduser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      id: identifieduser.id,
      email: identifieduser.email,
      token,
    });
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
};

module.exports = {
  loginUser,
  signUpUser,
};
