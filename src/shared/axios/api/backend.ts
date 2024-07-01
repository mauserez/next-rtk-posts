import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
	withCredentials: false,
});

instance.interceptors.request.use(async (request) => {
	const session = await getServerSession();

	console.log(session);
	if (!session?.user) {
		return request;
	}

	//request.headers["Authorization"] = `Bearer ${session.user.name}`;
	//request.headers["cache"] = `force-cache`;

	return request;
});
