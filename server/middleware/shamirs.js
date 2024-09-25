import AppError from "../utils/appError.js";
import shamir from 'shamirs-secret-sharing';

export const recoverKey = (shares) => {

   const recovered = shamir.combine(shares);
   if (!recovered) {
      return (next(new AppError('Could not recover the hashing key!', 400)));
   }

   const hashingKey = recovered.toString();
   if (!hashingKey) {
      return (next(new AppError('Could not generate the hashing key!', 400)));
   }

   return hashingKey;
}