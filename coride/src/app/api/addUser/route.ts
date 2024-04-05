import { NextResponse } from "next/server";
import User from "../../../models/user";
import connect from "../../../utils/db";
import Driver from "@/models/driver";

export async function POST(request: any) {
  await connect(); 

  const { email, first_name, last_name, gender, mobile, driver } = await request.json();

  try {
    if (driver) {
      const newDriver = await Driver.create({
        reg_no: driver.reg_no,
        car_type: driver.car_type,
        rating: driver.rating || 0 
      });

      const newUser = await User.create({
        email,
        first_name,
        last_name,
        gender,
        mobile,
        driver: newDriver._id 
      });

      return NextResponse.json({ message: "User and driver created", data: { user: newUser, driver: newDriver } }, { status: 201 });
    } else {
      const newUser = await User.create({
        email,
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
