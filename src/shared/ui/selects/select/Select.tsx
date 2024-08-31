import { memo } from "react";
import { Select as MSelect, SelectProps as MSelectProps } from "@mantine/core";
import { cn } from "shared/lib/cn";

export type SelectProps = MSelectProps;
export function Select(props: SelectProps) {
	const {
		checkIconPosition = "right",
		className,
		onChange,
		size = "md",
		data = [],
		variant,
		...restProps
	} = props;

	const unstyled = variant === "unstyled";

	return (
		<MSelect
			data={data}
			size={size}
			onChange={(value, option) => {
				onChange?.(value, option);
			}}
			className={cn("w-full", className)}
			checkIconPosition={checkIconPosition}
			variant={variant}
			data-no-border={unstyled}
			data-no-shadow={unstyled}
			{...restProps}
		/>
	);
}

export const MemoSelect = memo(Select) as typeof Select;
