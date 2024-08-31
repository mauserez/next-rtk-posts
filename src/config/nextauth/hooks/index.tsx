import { useSession } from "next-auth/react";

export function useIsAuthenticated() {
	const session = useSession();
	return session.status !== "loading" && session.status === "authenticated";
}

export function useIsNotAuthenticated() {
	const session = useSession();
	return session.status !== "loading" && session.status === "unauthenticated";
}

export function useSessionUser() {
	const session = useSession();
	return session.data?.user;
}
