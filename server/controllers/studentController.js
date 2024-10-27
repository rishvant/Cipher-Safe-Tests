import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Student from '../models/studentModel.js';
import uploadImageToCloudinary from '../utils/uploadImage.js';
import sendEmail from '../services/nodemailer.js';

const generateRollNo = () => {
   const rollNo = Math.floor(Math.random() * 900000000000) + 100000000000;
   return rollNo;
}

export const registerStudentForExam = catchAsync(async (req, res, next) => {
   if (!req.file) {
      return next(new AppError('Did not receive any image with the form data!', 400));
   }

   const localPathToImage = req.file.path;
   const resultUpload = await uploadImageToCloudinary(localPathToImage);

   if (!resultUpload || !resultUpload.secure_url) {
      return next(new AppError('Image upload failed!', 500));
   }

   const imageURI = resultUpload.secure_url;

   let studentBody = req.body;
   studentBody.rollNo = generateRollNo();
   studentBody.imageURL = imageURI;

   const newStudent = await Student.create(studentBody);

   if (!newStudent) {
      return next(new AppError('Could not create user!', 500));
   }

   const emailOptions = {
      to: newStudent.email,
      subject: 'Registration Successful',
      message: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
         <h1 style="color: #4CAF50; text-align: center;">Welcome to the Exam Registration</h1>
         <p style="font-size: 18px; color: #333;">Dear <strong>${newStudent.candidateName}</strong>,</p>
         <p style="font-size: 16px; color: #555;">Your registration has been successfully completed.</p>
         <p style="font-size: 16px; color: #555;">Your Roll Number: <strong style="color: #4CAF50;">${newStudent.rollNo}</strong></p>
         <p style="font-size: 16px; color: #555;">Thank you for registering on Cipher Safe Tests!</p>
         <footer style="margin-top: 20px; font-size: 14px; text-align: center; color: #888;">
            <p>Best regards,</p>
            <p>Cipher Safe Tests</p>
         </footer>
      </div>
   `,
   };

   await sendEmail(emailOptions);

   res.status(201).json({
      status: 'success',
      student: newStudent
   });
});
