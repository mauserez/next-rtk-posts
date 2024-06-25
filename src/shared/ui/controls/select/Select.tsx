import { Select as MSelect, SelectProps as MSelectProps } from "@mantine/core";

export type SelectProps = MSelectProps;
export const Select = (props: SelectProps) => {
	const { withCheckIcon, checkIconPosition = "right", size = "md" } = props;
	return (
		<MSelect
			size={size}
			withCheckIcon={withCheckIcon}
			checkIconPosition={checkIconPosition}
			{...props}
		/>
	);
};
