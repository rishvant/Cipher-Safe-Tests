import crypto from 'crypto';
import AppError from '../utils/appError.js';

const encryptText = (text, key, iv) => {
   const cipher = crypto.createCipheriv(
      process.env.QUESTION_ENCRYPTION_ALGORITHM,
      key,
      iv
   );

   let encrypted = cipher.update(text, 'utf8', 'hex');
   encrypted += cipher.final('hex');
   return encrypted;
};

const encrypt = (question, key) => {
   const iv = Buffer.from(process.env.IV_HASH, 'hex');
   if (iv.length !== 16) {
      return (next(new AppError('Invalid IV length. Expected 16 bytes.', 400)));
   }

   const encryptionKey = Buffer.from(key, 'hex');
   if (encryptionKey.length !== 32) {
      return (next(new AppError('Invalid encryption key length. Expected 32 bytes for AES-256.', 500)));
   }

   const encrypted = {
      text: encryptText(question.text, encryptionKey, iv),
      option1: encryptText(question.option1, encryptionKey, iv),
      option2: encryptText(question.option2, encryptionKey, iv),
      option3: encryptText(question.option3, encryptionKey, iv),
      option4: encryptText(question.option4, encryptionKey, iv),
      correctOption: encryptText(question.correctOption, encryptionKey, iv)
   };

   return encrypted;
};

export default encrypt;
