import { useSession } from "next-auth/react";

export const useIsAuthenticated = () => {
	const session = useSession();
	return session.status !== "loading" && session.status === "authenticated";
};

export const useIsUnAuthenticated = () => {
	const session = useSession();
	return session.status !== "loading" && session.status === "unauthenticated";
};

export const useSessionUser = () => {
	const session = useSession();
	return session.data?.user;
};
