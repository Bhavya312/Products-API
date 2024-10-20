const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const BadRequestError = require('../errors/bad-request');
const UnauthenticatedError = require('../errors/unauthenticated');
const asyncWrapper = require('../middleware/async');
const { CustomAPIError, NotFoundError } = require('../errors');

const register = asyncWrapper(async (req, res) => {
  const user = await User.create({ ...req.body })
  res.status(StatusCodes.CREATED).send({ user: {username:user.username}, msg:'Registerd successfully'});
})

const login = asyncWrapper(async (req, res) => {
  const {email, password} = req.body;
  if(!email && !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({email});
  //compare password
  if(!user){
    throw new NotFoundError("User Not Found");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if(!isPasswordCorrect){
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({user: {username:user.username}, token, msg:'Login successfully'});
})

module.exports = {login, register}