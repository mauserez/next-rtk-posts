"use client";

import {
	useController,
	type UseControllerProps,
	type FieldValues,
} from "react-hook-form";

import { MultiSelect, type MultiSelectProps } from "shared/ui/controls/selects";

export type FormMultiSelectProps<T extends FieldValues> =
	UseControllerProps<T> & Omit<MultiSelectProps, "value" | "defaultValue">;

export function FormMultiSelect<T extends FieldValues>({
	name,
	control,
	defaultValue,
	rules,
	shouldUnregister,
	onChange,
	...props
}: FormMultiSelectProps<T>) {
	const {
		field: { value, onChange: fieldOnChange, ref, ...field },
		fieldState,
	} = useController<T>({
		name,
		control,
		defaultValue,
		rules,
		shouldUnregister,
	});

	return (
		<MultiSelect
			value={value}
			onChange={(value) => {
				fieldOnChange(value);
				onChange?.(value);
			}}
			error={fieldState.error?.message}
			{...field}
			{...props}
		/>
	);
}
