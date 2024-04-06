import User from "@/models/user"; // Import the User model
import connect from "@/utils/db";

export async function PUT(req:Request) {
  try {
    const varr =  req.body;
    if(varr) {
       
    }
    // const { userId, latitude, longitude } = Request;
    // console.log(userId, latitude, longitude);
    //     await connect();
    //     const user = await User.findById(userId);

    //     if (!user) {
    //       return res.status(404).json({ message: 'User not found' });
    //     }

    //     user.location = {
    //       latitude,
    //       longitude,
    //     };

    //     await user.save();

    return Response.json({ message: "User location updated successfully" });
  } catch (error) {
    // console.error('Error updating user location:', error);
    return Response.json({ message: "Internal server error" });
  }
}
