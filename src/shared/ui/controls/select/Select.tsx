import { Select as MSelect, SelectProps as MSelectProps } from "@mantine/core";

export type SelectProps = MSelectProps;
export const Select = (props: SelectProps) => {
	return <MSelect {...props} />;
};
