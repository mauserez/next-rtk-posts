"use client";

import { useSession } from "next-auth/react";

export const useIsAuthenticated = () => {
	const auth = useSession();
	return auth.status === "authenticated";
};
