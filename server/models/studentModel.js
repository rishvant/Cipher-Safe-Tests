import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const studentSchema = new mongoose.Schema({
   candidateName: {
      type: String,
      // required: [true, "Candidate's name is required"],
      trim: true,
      maxlength: [20, "Candidate's name length cannot exceed 20 letters!"],
      minlength: [2, "Candidate's name length should be at least 2 letters!"],
   },
   fathersName: {
      type: String,
      // required: [true, "Father's name is required"],
      trim: true,
      maxlength: [20, "Father's name length cannot exceed 20 letters!"],
      minlength: [2, "Father's name length should be at least 2 letters!"],
   },
   mothersName: {
      type: String,
      // required: [true, "Mother's name is required"],
      trim: true,
      maxlength: [20, "Mother's name length cannot exceed 20 letters!"],
      minlength: [2, "Mother's name length should be at least 2 letters!"],
   },
   rollNo: {
      type: Number,
      // required: [true, 'Roll No is required'],
      unique: [true, 'Roll No. must be unique']
   },
   dateOfBirth: {
      type: Date,
      // required: [true, "Date of birth is required"],
   },
   gender: {
      type: String,
      enum: ['male', 'female'],
      // required: [true, "Gender is required"],
   },
   pincode: {
      type: Number,
      // required: [true, "Pincode is required"],
   },
   phoneNumber: {
      type: String,
      // validate: [validator.isMobilePhone, 'Please fill a valid email address'],
      // required: [true, "Phone number is required"],
   },
   email: {
      type: String,
      // required: [true, "Email address is required"],
      unique: true,
      lowercase: true,
      // validate: [validator.isEmail, 'Please fill a valid email address'],
   },
   password: {
      type: String,
      // required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long!'],
      select: false,
   },
   medium: {
      type: String,
      enum: ['english', 'hindi'],
      // required: [true, "Medium is required"],
   },
   educationalDetails: {
      class10: {
         schoolName: {
            type: String,
            // required: [true, "Class 10 school name is required"],
         },
         percentage: {
            type: Number,
            min: [0, 'Percentage cannot be less than 0'],
            // required: [true, "Class 10 percentage is required"],
         }
      },
      class12: {
         schoolName: {
            type: String,
            // required: [true, "Class 12 school name is required"],
         },
         percentage: {
            type: Number,
            min: [0, 'Percentage cannot be less than 0'],
            // required: [true, "Class 12 percentage is required"],
         }
      }
   },
   annualFamilyIncome: {
      type: Number,
      min: [0, 'Annual Income cannot be less than 0'],
      // required: [true, "Annual family income is required"],
   },
   imageURL: {
      // validate: [validator.isURL, 'String must be a URL'],
      type: String,
   },
   publicKey: {
      type: String,
      default: ""
   }
});

studentSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return next();
   this.password = await bcrypt.hash(this.password, 12);
   next();
});

studentSchema.methods.correctPassword = async function (
   candidatePassword,
   userPassword
) {
   return await bcrypt.compare(candidatePassword, userPassword);
};

const Student = mongoose.model('Student', studentSchema);
export default Student;
