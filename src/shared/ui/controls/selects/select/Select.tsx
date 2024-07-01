import { memo } from "react";
import { Select as MSelect, SelectProps as MSelectProps } from "@mantine/core";
import { cn } from "@/shared/utils/cn";

export type SelectExtraProps = {
	noBorder?: boolean;
	noShadow?: boolean;
};

export type SelectProps = MSelectProps & SelectExtraProps;
export const Select = (props: SelectProps) => {
	const {
		noBorder = false,
		noShadow = false,
		withCheckIcon,
		checkIconPosition = "right",
		className,
		onChange,
		size = "md",
		data = [],
		...restProps
	} = props;

	return (
		<MSelect
			data={data}
			size={size}
			onChange={(value, option) => {
				onChange?.(value, option);
			}}
			className={cn("w-full", className)}
			withCheckIcon={withCheckIcon}
			checkIconPosition={checkIconPosition}
			data-no-border={noBorder}
			data-no-shadow={noShadow}
			{...restProps}
		/>
	);
};

export const MemoSelect = memo(Select) as typeof Select;
