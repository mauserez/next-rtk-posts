import { ReactNode } from "react";
import { ReduxStoreProvider } from "config/providers/redux-store/ReduxStoreProvider";
import { TanstackQueryProvider } from "config/providers/tanstack-query/TanstackQueryProvider";
import { MantineProvider } from "config/providers/mantine/MantineProvider";
import { NextAuthProvider } from "config/providers/next-auth/NextAuthProvider";
import { AuthProtected } from "config/providers/auth-protected/AuthProtected";

type ProvidersProps = {
	children: ReactNode;
};

export function Providers(props: ProvidersProps) {
	const { children } = props;

	return (
		<NextAuthProvider>
			<MantineProvider>
				<AuthProtected>
					<TanstackQueryProvider>
						<ReduxStoreProvider>{children}</ReduxStoreProvider>
					</TanstackQueryProvider>
				</AuthProtected>
			</MantineProvider>
		</NextAuthProvider>
	);
}
