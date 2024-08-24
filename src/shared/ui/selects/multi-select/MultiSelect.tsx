import { memo, useState, useRef } from "react";
import {
	MultiSelect as MSelect,
	MultiSelectProps as MSelectProps,
} from "@mantine/core";

import { MdClear } from "react-icons/md";
import { cn } from "@/shared/utils/cn";

export type MultiSelectProps = Omit<MSelectProps, "searchable">;
export const MultiSelect = (props: MultiSelectProps) => {
	const {
		checkIconPosition = "right",
		className,
		clearable = true,
		clearButtonProps,
		size = "md",
		data = [],
		onChange,
		classNames,
		variant,
		value,
		...restProps
	} = props;

	const defaultClassNames = {
		pillsList: cn("flex flex-nowrap overflow-hidden justify-start"),
	};

	const defaultClearButtonProps = {
		icon: <MdClear />,
		className: cn("!text-inherit"),
	};

	const inputRef = useRef<HTMLInputElement>(null);
	const [currentValue, setCurrentValue] = useState<string[]>([]);
	const hiddenClass = currentValue.length > 0 ? "w-0 h-0 absolute" : "";
	const unstyled = variant === "unstyled";

	return (
		<MSelect
			ref={inputRef}
			data={data}
			size={size}
			onChange={(value) => {
				onChange?.(value);
				setCurrentValue(value);
			}}
			clearable={clearable}
			clearButtonProps={{ ...defaultClearButtonProps, ...clearButtonProps }}
			className={cn("w-full", className)}
			classNames={{
				...defaultClassNames,
				...classNames,
				inputField: `${hiddenClass}`,
			}}
			checkIconPosition={checkIconPosition}
			variant={variant}
			value={value}
			data-no-border={unstyled}
			data-no-shadow={unstyled}
			{...restProps}
		/>
	);
};

export const MemoMultiSelect = memo(MultiSelect) as typeof MultiSelect;
