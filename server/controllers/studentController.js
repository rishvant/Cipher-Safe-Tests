import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Student from '../models/studentModel.js';
import uploadImageToCloudinary from '../utils/uploadImage.js';

const generateRollNo = () => {
   const rollNo = Math.floor(Math.random() * 900000000000) + 100000000000;
   return rollNo;
}

export const registerStudentForExam = catchAsync(async (req, res, next) => {

   // if(!req.file) {
   //    return next(new AppError('Did not receive any image with the form data!', 400));
   // }
   
   // const localPathToImage = req.file.fileName;
   // const resultUpload = uploadImageToCloudinary(localPathToImage);

   // const imageURI = resultUpload.secure_url;

   let studentBody = req.body;
   studentBody.rollNo = generateRollNo();
   // studentBody.imageURI = imageURI;

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
