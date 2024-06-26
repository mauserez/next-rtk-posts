import { Select as MSelect, SelectProps as MSelectProps } from "@mantine/core";

export type SelectProps = MSelectProps;
export const Select = (props: SelectProps) => {
	const {
		withCheckIcon,
		checkIconPosition = "right",
		size = "md",
		data = [],
	} = props;

	return (
		<MSelect
			data={data}
			size={size}
			withCheckIcon={withCheckIcon}
			checkIconPosition={checkIconPosition}
			{...props}
		/>
	);
};
