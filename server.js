import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import { app } from './app.js';

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

// CREATE MONGODB SCHEMA
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Park Camper',
  price: 400,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('ERROR!', err);
  });

// START SERVER
app.listen(port, () => {
  console.log(`Web Server is running on port ${port}`);
});
