import { getServerSession } from "next-auth";
import { nextAuthOptions } from "config/nextauth/auth.config";

export async function session() {
	return await getServerSession(nextAuthOptions);
}

export async function sessionUser() {
	const session = await getServerSession(nextAuthOptions);
	return session?.user;
}

export async function isAuthenticated() {
	const session = await getServerSession(nextAuthOptions);
	return !!session?.user.name;
}
