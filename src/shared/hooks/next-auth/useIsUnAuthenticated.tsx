"use client";

import { useSession } from "next-auth/react";

export function useIsUnAuthenticated() {
	const auth = useSession();
	return auth.status !== "loading" && auth.status === "unauthenticated";
}
