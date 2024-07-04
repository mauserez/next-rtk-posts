import { memo, useState } from "react";
import {
	MultiSelect as MSelect,
	MultiSelectProps as MSelectProps,
} from "@mantine/core";

import { cn } from "@/shared/utils/cn";

export type MultiSelectProps = MSelectProps;
export const MultiSelect = (props: MultiSelectProps) => {
	const {
		checkIconPosition = "right",
		className,
		size = "md",
		data = [],
		onChange,
		classNames,
		variant,
		...restProps
	} = props;

	const [currentValue, setCurrentValue] = useState<string[]>([]);
	const hiddenClass = currentValue.length > 0 ? "" : "";
	const unstyled = variant === "unstyled";

	return (
		<MSelect
			data={data}
			size={size}
			onChange={(value) => {
				onChange?.(value);
				setCurrentValue(value);
			}}
			className={cn("w-full", className)}
			classNames={{ ...classNames, inputField: `${hiddenClass}` }}
			checkIconPosition={checkIconPosition}
			variant={variant}
			data-no-border={unstyled}
			data-no-shadow={unstyled}
			{...restProps}
		/>
	);
};

export const MemoMultiSelect = memo(MultiSelect) as typeof MultiSelect;
