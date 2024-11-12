import express from 'express';
import mongoose from 'mongoose';

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to mongoDB!'))
  .catch((err) => console.log(err));

const app = express();

app.listen(8080, () => {
  console.log('Server is running on port 3000');
});
