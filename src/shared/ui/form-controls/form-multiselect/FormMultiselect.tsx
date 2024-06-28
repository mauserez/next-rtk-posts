"use client";

import {
	useController,
	type UseControllerProps,
	type FieldValues,
} from "react-hook-form";

import { MultiSelect, type MultiSelectProps } from "shared/ui/controls/selects";

export type FormSelectProps<T extends FieldValues> = UseControllerProps<T> &
	Omit<MultiSelectProps, "value" | "defaultValue">;

export function FormSelect<T extends FieldValues>({
	name,
	control,
	defaultValue,
	rules,
	shouldUnregister,
	onChange,
	...props
}: FormSelectProps<T>) {
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
