import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI
if(!mongodbUri){
  throw new Error("Pleaase define mongodb uri")
}

let cached = global.mongoose;
if(!cached){
  cached = global.mongoose = {
    connection: null,
    promise: null
  }
}

export async function connectionToDB(){
  if(cached.connection){
    return cached.connection
  }

  if (!cached.promise) {
  const opts = {
    bufferCommands: true,
    maxPoolSize: 10
  };
  cached.promise = mongoose.connect(mongodbUri, opts).then(() => mongoose.connection);
}


  try {
    cached.connection = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }
  return cached.connection
}