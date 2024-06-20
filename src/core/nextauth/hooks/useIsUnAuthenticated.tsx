"use client";

import { useSession } from "next-auth/react";

export const useIsUnAuthenticated = () => {
	const auth = useSession();
	return auth.status !== "loading" && auth.status === "unauthenticated";
};
