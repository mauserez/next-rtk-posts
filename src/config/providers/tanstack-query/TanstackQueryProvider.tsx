"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "core/providers/tanstack-query/utils/getQueryClient";

type TanstackQueryProviderProps = {
	children: ReactNode;
};

export const TanstackQueryProvider = (props: TanstackQueryProviderProps) => {
	const { children } = props;
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};
