import express from 'express';
import bcrypt from 'bcrypt';
import User from '../modules/user.js';

const userRouter = express.Router();

userRouter.get('/', async (request, response, next) => {
  const users = await User.find({});
  return response.status(200).json(users);
});

userRouter.post('/', async (request, response, next) => {
  const {name, username, password} = request.body;

  if (password.length < 3) {
    return response
      .status(400)
      .json({error: 'the length of password should be more than 3'});
  }
  if (!(name && username && password)) {
    return response
      .status(400)
      .json({error: 'name,username,password are required'});
  }

  try {
    const salt = 10;
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      username: username,
      name: name,
      passwordHash: passwordHash,
    });

    const savedUser = await user.save();
    return response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

export default userRouter;
