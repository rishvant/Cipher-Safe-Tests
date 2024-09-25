import Student from "../models/studentModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import shamir from 'shamirs-secret-sharing';
import { Keypair } from "@solana/web3.js";

const generateKeyPair = () => {
   const keypair = Keypair.generate();
   return {
      secretKey: Buffer.from(keypair.secretKey).toString('base64'),
      publicKey: keypair.publicKey
   };
}

export const generateShamirSecrets = catchAsync(async (req, res, next) => {
   if (!req.body.hashingKey) {
      return (next(new AppError('Hashing key is missing', 400)));
   }

   const secret = Buffer.from(req.body.hashingKey);
   const shares = shamir.split(secret, { shares: 3, threshold: 2 });

   const sharesList = shares.map(x => x.toString('hex'));

   res.status(200).json({
      status: "success",
      data: {
         sharesList
      }
   })
})

export const generateKeys = catchAsync(async (req, res, next) => {

   const { secretKey, publicKey } = generateKeyPair();

   const student = await Student.findOneAndUpdate(
      { rollNo: req.body.rollNo },
      { publicKey: publicKey },
      { runValidators: true }
   );

   if (!student) {
      return (next(new AppError('Could not generate public-secret keypair!', 500)));
   }

   res.status(200).json({
      status: 'success',
      data: {
         secret: secretKey,
         public: publicKey
      }
   })
})
