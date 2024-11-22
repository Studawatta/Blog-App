import User from '../models/user.model.js';
import { customError } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(customError(403, 'You are not allowed to update this user'));
  }
  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(customError(403, 'You are not allowed to delete this user'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out!');
  } catch (error) {
    next(error);
  }
};
