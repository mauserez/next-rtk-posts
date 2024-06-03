import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./auth.config";

export const session = async () => {
	return await getServerSession(nextAuthOptions);
};

export const sessionUser = async () => {
	const session = await getServerSession(nextAuthOptions);
	return session?.user;
};
