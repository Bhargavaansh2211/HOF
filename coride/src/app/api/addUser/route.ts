import { NextResponse } from "next/server";
import User from "../../../models/user";
import connect from "../../../utils/db";
import Driver from "@/models/driver";

export async function POST(request: any) {
  await connect();

  const { role, first_name, last_name, gender, mobile, vehicleType, vehicleNumber } = await request.json();

  try {
    if (role === 'Driver') {
      const newDriver = await Driver.create({
        car_type: vehicleType,
        reg_no: vehicleNumber,
        rating: 0 // Default rating
      });

      const newUser = await User.create({
        first_name,
        last_name,
        gender,
        mobile,
        driver: newDriver._id
      });
      console.log(newUser)
      return NextResponse.json({ message: "User and driver created", data: { user: newUser, driver: newDriver } }, { status: 201 });
    } else {
      const newUser = await User.create({
        first_name,
        last_name,
        gender,
        mobile,
      });

      return NextResponse.json({ message: "User created", data: newUser }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error creating user or driver", error: error }, { status: 500 });
  }
}
