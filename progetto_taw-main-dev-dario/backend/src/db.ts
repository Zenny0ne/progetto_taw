const mongoose = require('mongoose');

mongoose.connect('mongodb://host.docker.internal:27017/mydatabase', {
  connectTimeoutMS: 10000 // 10 seconds timeout
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err: any) => {
  console.error('MongoDB connection error:', err);
});

// Connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err: any) => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});


