import { memo, useState } from "react";
import {
	MultiSelect as MSelect,
	MultiSelectProps as MSelectProps,
} from "@mantine/core";

export type MultiSelectExtraProps = {
	noBorder?: boolean;
	noShadow?: boolean;
};

export type MultiSelectProps = MSelectProps & MultiSelectExtraProps;
export const MultiSelect = (props: MultiSelectProps) => {
	const {
		withCheckIcon,
		checkIconPosition = "right",
		size = "md",
		data = [],
		onChange,
		classNames,
		comboboxProps = { shadow: "lg" },
		noBorder = false,
		noShadow = false,
		...restProps
	} = props;

	const [currentValue, setCurrentValue] = useState<string[]>([]);
	const hiddenClass = currentValue.length > 0 ? "hidden" : "";

	return (
		<MSelect
			data={data}
			size={size}
			onChange={(value) => {
				onChange?.(value);
				setCurrentValue(value);
			}}
			classNames={{ ...classNames, inputField: `${hiddenClass}` }}
			withCheckIcon={withCheckIcon}
			checkIconPosition={checkIconPosition}
			comboboxProps={comboboxProps}
			data-no-border={noBorder}
			data-no-shadow={noShadow}
			{...restProps}
		/>
	);
};

export const MemoMultiSelect = memo(MultiSelect) as typeof MultiSelect;
