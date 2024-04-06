// Resource: https://clerk.com/docs/nextjs/middleware#auth-middleware
// Copy the middleware code as it is from the above resource

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // An array of public routes that don't require authentication.
  publicRoutes: ["/api/webhook/clerk","/updateLocation"],

  // An array of routes to be ignored by the authentication middleware.
  // ignoredRoutes: ["/api/webhook/clerk","/api/addUser","/api/+918949489178"],
  ignoredRoutes: ["/api/webhook/clerk","/api/299283","/api/918949489178","/api/updateLocation","/api/addUser"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

