// pages/api/[mobileNumber].ts
import connect from '../../../utils/db'; // Import your database connection utility
import User from '../../../models/user'; // Import your User model

export async function GET(req:Request,{params}:any) {
  
  // const router = useRouter()
  let { mobile } = params;
  mobile = "+"+mobile;

  try {
    await connect(); 

    // Query the database to find the user based on the mobile number
    const user = await User.findOne({ mobile }).populate('driver');
    if (!user) {
      return Response.json({ message: 'User not found' });
    }

    // Return the user information
    return Response.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
   return   Response.json({ message: 'Internal server error' });
  }
}
