import mongoose, { model, models, Schema } from "mongoose";

const schoolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String, // Using String to allow leading zeros and formatting
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const School = models?.School || model("School", schoolSchema);
export default School;
