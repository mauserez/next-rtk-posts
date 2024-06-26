import {
	MultiSelect as MSelect,
	MultiSelectProps as MSelectProps,
} from "@mantine/core";

export type MultiSelectProps = MSelectProps;
export const MultiSelect = (props: MultiSelectProps) => {
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
