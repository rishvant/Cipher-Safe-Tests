import cloudinary from 'cloudinary';

// Cloudinary config
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Image to Cloudinary
const uploadImageToCloudinary = (filePath) => {
   return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(filePath, { resource_type: 'image' }, (error, result) => {
         if (error) {
            reject(error);
         } else {
            resolve(result); // This result should contain secure_url
         }
      });
   });
};

export default uploadImageToCloudinary;
