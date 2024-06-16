import { ReactNode } from "react";
import { ReduxStoreProvider } from "./redux-store/ReduxStoreProvider";
import { TanstackQueryProvider } from "./tanstack-query/TanstackQueryProvider";
import { MantineProvider } from "./mantine/MantineProvider";
import { NextAuthProvider } from "./next-auth/NextAuthProvider";

type ProvidersProps = {
	children: ReactNode;
};

export const Providers = (props: ProvidersProps) => {
	const { children } = props;

	return (
		<NextAuthProvider>
			<ReduxStoreProvider>
				<MantineProvider>
					<TanstackQueryProvider>{children}</TanstackQueryProvider>
				</MantineProvider>
			</ReduxStoreProvider>
		</NextAuthProvider>
	);
};
