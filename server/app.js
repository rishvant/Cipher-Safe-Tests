import express from 'express';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSantize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import AppError from './utils/appError.js';
import studentRouter from './routes/studentRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import cors from 'cors';

const app = express();
app.use(helmet()); //set security http headers

//limit requests
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP',
});

// app.use('/api').route(limiter);
app.use('/api', limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(mongoSantize()); //query injection
app.use(xss()); // html codes

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

app.use('/api/v1/student', studentRouter);
app.use('/api/v1/admin', adminRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Could not find ${req.originalUrl} on this Server!`, 404));
});

export default app;
