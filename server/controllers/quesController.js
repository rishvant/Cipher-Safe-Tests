import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import encrypt from '../middleware/encryptQuestion.js';
import decrypt from '../middleware/decryptQuestion.js';
import Question from '../models/questionModel.js';
import { recoverKey } from '../middleware/shamirs.js';

//14444890a8d8abf9af6f7f1ff45ce719881c1de6b87a21c0e2e3d68c5813fd5b - hashingkey
export const uploadQuestion = catchAsync(async (req, res, next) => {

   if (!req.body.hashingKey) {
      return next(new AppError('Secret hashing key is missing', 401));
   }

   const encryptedQues = encrypt({
      text: req.body.text,
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
      correctOption: req.body.correctOption
   },
      req.body.hashingKey, next
   );

   const newQuestion = await Question.create({
      ...encryptedQues,
      createdBy: req.admin.id,
      subject: req.body.subject
   });

   if (!newQuestion) {
      return (next(new AppError("Could not post the question", 401)));
   }

   res.status(200).json({
      status: 'success',
      message: 'Successfully posted new question!'
   })
});

export const retrieveQuestions = catchAsync(async (req, res, next) => {
   const hashingKey = recoverKey(
      [process.env.SHAMIR_1,
      process.env.SHAMIR_2,
      process.env.SHAMIR_3]);

   if (!hashingKey) {
      return (next(new AppError('Could not recover hashing key in controller', 500)));
   }

   const questions = await Question.find();
   const decryptedQuestions = [];

   questions.forEach(ques => {
      decryptedQuestions.push(decrypt(ques, hashingKey, next));
   })

   console.log(decryptedQuestions);

   if (!questions) {
      return (next(new AppError('Could not fetch quesions from the DB', 400)));
   }
   const data = {};

   decryptedQuestions.forEach(question => {
      const { subject } = question;
      if (!data[subject]) {
         data[subject] = [];
      }
      data[subject].push(question);
   });

   if (!data) {
      return (next(new AppError('Error manupulating data', 500)));
   }

   res.status(200).json({
      status: 'success',
      questions: [data]
   });
})