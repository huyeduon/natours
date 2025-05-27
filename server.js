// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app.js');
// import { app } from './app.js';

const port = process.env.PORT || 3000;
// const DB = process.env.DATABASE_LOCAL;
// console.log(DB);

// // mongoose.connect(DB).then((con) => {
// //   console.log('DB Connection successful!');
// // });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_LOCAL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

// START SERVER
app.listen(port, () => {
  console.log(`Web Server is running on port ${port}`);
});
