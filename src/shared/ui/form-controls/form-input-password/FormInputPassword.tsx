"use client";

import {
	useController,
	type UseControllerProps,
	type FieldValues,
} from "react-hook-form";

import {
	InputPassword,
	type InputPasswordProps,
} from "@/shared/ui/controls/inputs";

export type FormInputProps<T extends FieldValues> = UseControllerProps<T> &
	Omit<InputPasswordProps, "value" | "defaultValue">;

export function FormInputPassword<T extends FieldValues>({
	name,
	control,
	defaultValue,
	rules,
	shouldUnregister,
	onChange,
	...props
}: FormInputProps<T>) {
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
		<InputPassword
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
