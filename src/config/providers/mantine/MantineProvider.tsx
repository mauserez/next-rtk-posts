import "@mantine/core/styles.css";
import {
	MantineProvider as Provider,
	MantineProviderProps,
} from "@mantine/core";

import { theme } from "config/providers/mantine/theme";

export function MantineProvider(props: MantineProviderProps) {
	const { children } = props;

	return (
		<Provider defaultColorScheme="light" theme={theme}>
			{children}
		</Provider>
	);
}
