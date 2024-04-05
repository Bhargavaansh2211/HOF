import mongoose from "mongoose";

const { Schema } = mongoose;

const driverSchema = new Schema(
  {
    reg_no: {
      type: String,
      required: true,
      unique: true,
    },
    car_type: {
      type: String,
      required: true,
      unique: true,
    },
    rating: {
      type: Number,
      default:0, 
    },
  },
  { timestamps: true }
);

const Driver = mongoose.models.Driver || mongoose.model("Driver", driverSchema);
export default Driver
