import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const testAPI = catchAsync(async (req, res, next) => {
  const data = req.params.test;
  if (!data) {
    return next(new AppError('Data is empty!', 500));
  }
  res.status(200).json({
    status: 'success',
    data,
  });
});
