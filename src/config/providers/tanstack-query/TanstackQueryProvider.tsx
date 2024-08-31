"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "config/providers/tanstack-query/lib/getQueryClient";

type TanstackQueryProviderProps = {
	children: ReactNode;
};

export function TanstackQueryProvider(props: TanstackQueryProviderProps) {
	const { children } = props;
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
