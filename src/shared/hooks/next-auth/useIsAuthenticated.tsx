"use client";

import { useSession } from "next-auth/react";

export function useIsAuthenticated() {
	const auth = useSession();
	return auth.status !== "loading" && auth.status === "authenticated";
}
