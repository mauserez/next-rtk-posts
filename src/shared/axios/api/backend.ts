import axios from "axios";
import { sessionUser } from "@/core/nextauth/auth";

export const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
});

instance.interceptors.request.use(async (request) => {
	const user = await sessionUser();

	if (!user) {
		return request;
	}

	request.headers["Authorization"] = `Bearer ${user.name}`;
	//request.headers["cache"] = `force-cache`;

	return request;
});
