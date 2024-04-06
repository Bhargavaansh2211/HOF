import User from "@/models/user";
import connect  from "@/utils/db";

export async function POST({params}:any) {
    let { mobile } = params;
    mobile = "+"+mobile;

  try {
    await connect(); 

    // Query the database to find the user based on the mobile number
    const user = await User.findOne({ mobile });
    if (!user) {
      return Response.json({ message: 'User not found' });
    }
    const {longitude, latitude} = user.location;

    const nearestUsers = await User.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [longitude, latitude], // GeoJSON format: [longitude, latitude]
            },
            distanceField: 'distance',
            spherical: true,
            maxDistance: 100000,
          },
        },
        {
          $match: {
            driver: { $exists: true }, // Filter users who have a driver field
          },
        },
      ]);
      console.log(nearestUsers)
    // Return the user information
    return Response.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
   return   Response.json({ message: 'Internal server error' });
  }
}
