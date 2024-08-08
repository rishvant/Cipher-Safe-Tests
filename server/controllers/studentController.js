import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Student from '../models/studentModel.js';

const generateRollNo = () => {
   const rollNo = Math.floor(Math.random() * 900000000000) + 100000000000;
   return rollNo;
}

export const registerStudentForExam = catchAsync(async (req, res, next) => {

   let studentBody = req.body;
   studentBody.rollNo = generateRollNo();

   const newStudent = await Student.create(studentBody);

   if (!newStudent) {
      return next(new AppError('Could not create user!'));
   }

   //Add a payment middleware here

   //Add mail service here

   res.status(201).json({
      status: 'success',
      student: newStudent
   })
});
