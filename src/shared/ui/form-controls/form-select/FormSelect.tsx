"use client";

import {
	useController,
	type UseControllerProps,
	type FieldValues,
} from "react-hook-form";

import { Select, type SelectProps } from "shared/ui/selects";

export type FormSelectProps<T extends FieldValues> = UseControllerProps<T> &
	Omit<SelectProps, "value" | "defaultValue">;

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
		field: { value, onChange: fieldOnChange, ref: fieldRef, ...field },
		fieldState,
	} = useController<T>({
		name,
		control,
		defaultValue,
		rules,
		shouldUnregister,
	});

	return (
		<Select
			value={value}
			onChange={(value, option) => {
				fieldOnChange(value);
				onChange?.(value, option);
			}}
			error={fieldState.error?.message}
			{...field}
			{...props}
		/>
	);
}
