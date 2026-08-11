import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../modules/user.js';

const loginRouter = express.Router();

loginRouter.post('/', async (request, response, next) => {
  const user = await User.findOne({username: request.body.username});

  const passwordHashCompare = await bcrypt.compare(
    request.body.password,
    user.passwordHash,
  );
  if (!(user && passwordHashCompare)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = await jwt.sign(userForToken, process.env.SECRET);
  response.status(200).json({token, username: user.username, name: user.name});
});

export default loginRouter;
