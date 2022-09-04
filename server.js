import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import 'express-async-errors';

import connectDB from './db/connect.js';
import authRouter from './routes/authRoutes.js';
import jobRouter from './routes/jobRoutes.js';

// Middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome!' })
})

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'Backend API!' })
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001;
const start = async() => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is running on port ${port} ...`)
    })
  } catch(error) {
    console.log(error)
  }
}

start();