import { createClient } from 'redis';

const client = createClient({
   url: 'redis://127.0.0.1:6379'
});

client.connect()
   .then(() => {
      console.log('Connected to Redis successfully');
   })
   .catch((err) => {
      console.error('Redis connection error:', err);
   });

export default client;