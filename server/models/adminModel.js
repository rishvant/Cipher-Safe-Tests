import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
   adminName: {
      type: String,
      required: [true, "Candidate's name is required"],
      trim: true,
      maxlength: [20, "Admin's length cannot exceed 20 letters!"],
      minlength: [2, "Candidate's name length should be at least 2 letters!"],
   },
   adminInstituteId: {
      type: String,
      required: [true, "Institute ID is required"],
      trim: true,
   },
   adminId: {
      type: String,
      required: [true, 'Admin ID is required'],
   },
   email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please fill a valid email address'],
   },
   password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long!'],
      select: false,
   },
   medium: {
      type: String,
      enum: ['english', 'hindi'],
      required: [true, "Medium is required"],
   },
   subject: {
      type: String,
      required: [true, 'Subject is required'],
      enum: ['physics', 'chemistry', 'mathematics']
   }
});

adminSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return next();
   this.password = await bcrypt.hash(this.password, 12);
   next();
});

adminSchema.methods.correctPassword = async function (
   candidatePassword,
   userPassword
) {
   return await bcrypt.compare(candidatePassword, userPassword);
};

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
