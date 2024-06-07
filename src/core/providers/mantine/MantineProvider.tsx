import "@mantine/core/styles.css";
import {
	MantineProvider as Provider,
	MantineProviderProps,
} from "@mantine/core";
import { theme } from "./theme";

export const MantineProvider = (props: MantineProviderProps) => {
	const { children } = props;
	return <Provider theme={theme}>{children}</Provider>;
};
