import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const workerDB = mongoose.createConnection(process.env.WORKER_DB.replace('<PASSWORD>', process.env.WORKER_DB_PASSWORD), {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

workerDB.once('open', () => {
   console.log('Connected to Worker DB successfully!');
});

workerDB.on('error', (err) => {
   console.error('Worker DB connection error:', err);
});

export default workerDB;
