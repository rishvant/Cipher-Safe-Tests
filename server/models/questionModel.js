import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
   text: {
      type: String,
      required: true
   },
   option1: {
      type: String,  
      required: true
   },
   option2: {
      type: String,  
      required: true
   },
   option3: {
      type: String,  
      required: true
   },
   option4: {
      type: String, 
      required: true
   },
   correctOption: {
      type: String, 
      required: true
   },
   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

const Question = mongoose.model('Question', questionSchema);
export default Question;