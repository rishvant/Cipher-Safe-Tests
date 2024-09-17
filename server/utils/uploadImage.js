import cloudinary from '../services/cloudinary.js';
import catchAsync from '../utils/catchAsync.js';

const uploadImageToCloudinary = catchAsync(async (localPathToImage) => {
   const result = await cloudinary.uploader.upload(localPathToImage, { resource_type: 'image' })
   return result;
})

export default uploadImageToCloudinary;
