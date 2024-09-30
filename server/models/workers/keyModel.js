import { Schema } from 'mongoose';
import workerDB from '../../services/workerDB.js';

const keySchema = new Schema({
   rollNo: {
      type: String,
      required: true,
      unique: [true, 'Roll No. must be unique']
   },
   publicKey: {
      required: true,
      type: String
   }
});

const Key = workerDB.model('Key', keySchema);
export default Key;