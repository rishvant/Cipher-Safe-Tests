export const cookieOptions = {
   //creating a cookie that will be sent to the browser by server
   expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
   ),
   httpOnly: true,
};