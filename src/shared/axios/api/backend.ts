import axios from "axios";
import { getServerSession } from "next-auth";
import { isServer } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

export const instance = axios.create({
	baseURL: isServer
		? process.env.NEXT_PUBLIC_BACKEND_SERVER_API
		: process.env.NEXT_PUBLIC_BACKEND_API,
	withCredentials: false,
});

instance.interceptors.request.use(async (request) => {
	if (isServer) {
		const session = await getServerSession();
		if (!session?.user) {
			return request;
		}
	}

	if (!isServer) {
		const session = await getSession();

		if (!session?.user) {
			return request;
		}
	}

	//request.headers["Authorization"] = `Bearer ${session.user.name}`;
	//request.headers["cache"] = `force-cache`;

	return request;
});
