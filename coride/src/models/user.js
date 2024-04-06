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
      type: String,
      required:true,
      unique:true,
    },
    driver:{
      type: mongoose.Types.ObjectId,
      ref: Driver
    },
    location:{
      latitude:{
        type:Number,
        default:null,
      },
      longitude:{
        type:Number,
        default:null,
      }
    }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);