import express from 'express';
import morgan from 'morgan';
import path from 'path';
import AppError from './utils/appError.js';
import testRouter from './routes/testRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/test', testRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Could not find ${req.originalUrl} on this Server!`, 404));
});

export default app;
