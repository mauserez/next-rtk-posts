import { ReactNode } from "react";
import { ReduxStoreProvider } from "./redux-store/ReduxStoreProvider";
import { TanstackQueryProvider } from "./tanstack-query/TanstackQueryProvider";
import { MantineProvider } from "./mantine/MantineProvider";
import { NextAuthProvider } from "./next-auth/NextAuthProvider";
import { AuthProtected } from "./auth-protected/AuthProtected";

type ProvidersProps = {
	children: ReactNode;
};

export const Providers = (props: ProvidersProps) => {
	const { children } = props;

	return (
		<MantineProvider>
			<NextAuthProvider>
				<AuthProtected>
					<TanstackQueryProvider>
						<ReduxStoreProvider>{children}</ReduxStoreProvider>
					</TanstackQueryProvider>
				</AuthProtected>
			</NextAuthProvider>
		</MantineProvider>
	);
};
