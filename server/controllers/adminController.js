import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import shamir from 'shamirs-secret-sharing';

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
