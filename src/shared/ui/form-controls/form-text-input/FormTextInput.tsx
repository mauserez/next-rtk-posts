"use client";

import {
	useController,
	type UseControllerProps,
	type FieldValues,
} from "react-hook-form";

import { TextInput, type TextInputProps } from "shared/ui/controls/inputs";

export type FormTextInputProps<T extends FieldValues> = UseControllerProps<T> &
	Omit<TextInputProps, "value" | "defaultValue">;

export function FormTextInput<T extends FieldValues>({
	name,
	control,
	defaultValue,
	rules,
	shouldUnregister,
	onChange,
	...props
}: FormTextInputProps<T>) {
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
		<TextInput
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
