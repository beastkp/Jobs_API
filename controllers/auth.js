const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
// const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  // const { name, email, password } = req.body;
  // const salt = await bcrypt.genSalt(10); //for generating random bytes the number shows the amount of random bytes
  // const hashedPassword = await bcrypt.hash(password, salt);
  // const tempsUser = { name, email, password: hashedPassword };
  // const user = await User.create({ ...req.body });
  // refactored in auth.js in models;
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  // const token = jwt.sign({userID:user._id,name:user.name},'jwtSecret',{expiresIn:'30d'})
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token }); //here only name is decoded and other things are stored as tokens
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Password");
  }
  
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
