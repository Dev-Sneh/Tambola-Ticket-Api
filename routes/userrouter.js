require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/usermodel');
const { response } = require('express');
const userRoute = express.Router();

// register
userRoute.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // create a key to check a find query in db

    const key = {
      email: email,
    };
    let user = await UserModel.findOne(key);
    if (user != null) {
      return res.status(409).json({ message: 'User already exists' });
    }
    
    const salt = bcrypt.genSaltSync(12); // new salt is generated here
    const hashedPassword = await bcrypt.hashSync(password, salt); //hash the password here
    const userObject = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    // save it on db
    await UserModel.create(userObject);
    return res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// login
userRoute.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // create a key to check a find query in db

    const key = {
      email: email,
    };
    let user = await UserModel.findOne(key);
    if (user == null) {
      return res.status(401).json({ message: 'User does not exist' });
    }
    const validPassword = await bcrypt.compare(password, user.password); // verify the password using compare function
    if (validPassword) {
      const userData = {
        _id: user._id,
        name: user.name,
      };

      // token
      let token = generateToken(userData);
      return res.status(200).json({ message: 'Login successful', token: token });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }

  function generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    user.exp = exp.getTime() / 1000;
    return jwt.sign(user, process.env.jwtSecret);
  }
});

module.exports = { userRoute };
