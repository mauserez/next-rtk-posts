"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
	children?: React.ReactNode;
};

export function NextAuthProvider({ children }: Props) {
	return <SessionProvider refetchInterval={300}>{children}</SessionProvider>;
}
