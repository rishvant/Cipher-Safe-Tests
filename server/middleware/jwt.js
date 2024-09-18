import jwt from 'jsonwebtoken';

const signToken = (id, secret) => {
   //encodes the id of the user into the payload of the JWT and encrypt it with the JWT_SECRET
   return jwt.sign({ id: id }, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN,
   });
};

const createSendToken = (user, secret) => {
   const token = signToken(user._id, secret); //assigning a new token to the user (happi! happi! happi!)

   const cookieOptions = {
      //creating a cookie that will be sent to the browser by server
      expires: new Date(
         Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
   };

   if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

   // res.cookie('jwt', token, cookieOptions);
   return token;
};

export default createSendToken;