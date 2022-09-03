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
  // throw new Error('Error')
  res.send('Welcome!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobRouter)

// NOT FOUND MIDDLEWARE: If there is no matching route above
app.use(notFoundMiddleware);
// ERROR HANDLER MIDDLEWARE: places at last
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