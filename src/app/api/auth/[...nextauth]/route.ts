import NextAuth from "next-auth/next";
import { nextAuthOptions } from "config/nextauth/auth.config";

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };
