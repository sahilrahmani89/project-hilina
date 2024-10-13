import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI; // Ensure the variable name is correct

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("Database is already connected");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, { bufferCommands: false })
      .then(mongoose => {
        console.log("Database connection established");
        return mongoose;
      })
      .catch(error => {
        console.error("Database connection error:", error.message); // Improved error logging
        cached.promise = null; // Reset the promise on failure
        // throw new Error("Database connection failed");
      });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
