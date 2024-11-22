import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import { errorHandler } from './middlewares/error.js';

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to mongoDB!'))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler);

app.listen(8080, () => {
  console.log('Server is running on port 3000');
});
