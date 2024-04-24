import { ReactNode } from "react";
import { Group } from "@mantine/core";

type FilterProps = {
	children: ReactNode;
};
export const Filter = (props: FilterProps) => {
	const { children } = props;
	return <Group>{children}</Group>;
};
