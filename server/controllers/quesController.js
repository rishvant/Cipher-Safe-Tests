import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import encrypt from '../middleware/encryptQuestion.js';
import Question from '../models/questionModel.js';

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
      req.body.hashingKey
   );

   const newQuestion = await Question.create({
      ...encryptedQues,
      createdBy: req.admin.id
   });

   if (!newQuestion) {
      return (next(new AppError("Could not post the question", 401)));
   }

   res.status(200).json({
      status: 'success',
      message: 'Successfully posted new question!'
   })
});