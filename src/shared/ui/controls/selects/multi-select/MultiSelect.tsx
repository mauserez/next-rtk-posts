import { memo, useState } from "react";
import {
	MultiSelect as MSelect,
	MultiSelectProps as MSelectProps,
} from "@mantine/core";

import { cn } from "@/shared/utils/cn";

export type MultiSelectExtraProps = {
	noBorder?: boolean;
	noShadow?: boolean;
};

export type MultiSelectProps = MSelectProps & MultiSelectExtraProps;
export const MultiSelect = (props: MultiSelectProps) => {
	const {
		withCheckIcon,
		checkIconPosition = "right",
		className,
		size = "md",
		data = [],
		onChange,
		classNames,
		noBorder = false,
		noShadow = false,
		...restProps
	} = props;

	const [currentValue, setCurrentValue] = useState<string[]>([]);
	const hiddenClass =
		currentValue.length > 0 ? "/* min-w-0 w-0 placeholder:invisible */" : "";

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
			withCheckIcon={withCheckIcon}
			checkIconPosition={checkIconPosition}
			data-no-border={noBorder}
			data-no-shadow={noShadow}
			{...restProps}
		/>
	);
};

export const MemoMultiSelect = memo(MultiSelect) as typeof MultiSelect;
