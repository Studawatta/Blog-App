import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { customError } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    return next(customError(400, 'All fields are required!'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
  } catch (error) {
    next(error);
  }
};
