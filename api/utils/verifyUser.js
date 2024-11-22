import jwt from 'jsonwebtoken';
import { customError } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(customError(401, 'Unauthorized'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(customError(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};
