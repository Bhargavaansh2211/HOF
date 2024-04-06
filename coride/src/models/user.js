import mongoose from "mongoose";
import Driver from "./driver";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    gender:{
      type: String,
      required:true,
    },
    mobile:{
      type: Number,
      required:true,
      unique:true,
    },
    driver:{
      type: mongoose.Types.ObjectId,
      ref: Driver
    }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);