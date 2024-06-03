import NextAuth from "next-auth/next";
import { nextAuthOptions } from "../../../../core/nextauth/auth.config";

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };
