const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const Connection = async () => {
  try {
    const client = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Unable to connect to MongoDB Atlas', error);
  }
};

module.exports = Connection;
