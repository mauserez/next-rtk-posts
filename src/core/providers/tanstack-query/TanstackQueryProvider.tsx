"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type TanstackQueryProviderProps = {
	children: ReactNode;
};

const queryClient = new QueryClient();

export const TanstackQueryProvider = (props: TanstackQueryProviderProps) => {
	const { children } = props;

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};
