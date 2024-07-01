"use client";

import {
	useController,
	type UseControllerProps,
	type FieldValues,
} from "react-hook-form";

import { Checkbox, type CheckboxProps } from "shared/ui/controls/checkboxes";

export type FormCheckboxProps<T extends FieldValues> = UseControllerProps<T> &
	Omit<CheckboxProps, "value" | "defaultValue">;

export function FormCheckbox<T extends FieldValues>({
	name,
	control,
	defaultValue,
	rules,
	shouldUnregister,
	onChange,
	...props
}: FormCheckboxProps<T>) {
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
		<Checkbox
			value={value}
			onChange={(e) => {
				fieldOnChange(e);
				onChange?.(e);
			}}
			error={fieldState.error?.message}
			{...field}
			{...props}
		/>
	);
}
