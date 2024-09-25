import crypto from 'crypto';
import AppError from '../utils/appError.js';

const decryptText = (text, key, iv) => {
   const decipher = crypto.createDecipheriv(
      process.env.QUESTION_ENCRYPTION_ALGORITHM,
      key,
      iv
   );

   let decrypted = decipher.update(text, 'hex', 'utf8');
   decrypted += decipher.final('utf8');
   return decrypted;
};

const decrypt = (question, key, next) => {
   const iv = Buffer.from(process.env.IV_HASH, 'hex');
   if (iv.length !== 16) {
      return (next(new AppError('Invalid IV length. Expected 16 bytes.', 400)));
   }

   const encryptionKey = Buffer.from(key, 'hex');
   if (encryptionKey.length !== 32) {
      return (next(new AppError('Invalid encryption key length. Expected 32 bytes for AES-256.', 500)));
   }

   const decrypted = {
      text: decryptText(question.text, encryptionKey, iv),
      option1: decryptText(question.option1, encryptionKey, iv),
      option2: decryptText(question.option2, encryptionKey, iv),
      option3: decryptText(question.option3, encryptionKey, iv),
      option4: decryptText(question.option4, encryptionKey, iv),
   };

   return {
      text: decrypted.text,
      option1: decrypted.option1,
      option2: decrypted.option2,
      option3: decrypted.option3,
      option4: decrypted.option4,
      subject: question.subject
   };
};

export default decrypt;