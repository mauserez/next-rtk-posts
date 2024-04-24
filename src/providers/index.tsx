import { ReactNode } from "react";
import { ReduxStoreProvider } from "./redux-store/ReduxStoreProvider";
import { TanstackQueryProvider } from "./tanstack-query/TanstackQueryProvider";
import { MantineProvider } from "./mantine/MantineProvider";

type ProvidersProps = {
	children: ReactNode;
};

export const Providers = (props: ProvidersProps) => {
	const { children } = props;

	return (
		<ReduxStoreProvider>
			<MantineProvider>
				<TanstackQueryProvider>{children}</TanstackQueryProvider>
			</MantineProvider>
		</ReduxStoreProvider>
	);
};
