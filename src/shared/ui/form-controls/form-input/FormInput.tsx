"use client";

import { typedForwardRef } from "@/shared/utils/typedForwardRef";
import { ForwardedRef } from "react";
import {
	useController,
	type UseControllerProps,
	type FieldValues,
} from "react-hook-form";

import { Input, type InputProps } from "shared/ui/controls/inputs";

export type FormInputProps<T extends FieldValues> = UseControllerProps<T> &
	Omit<InputProps, "value" | "defaultValue">;

function FormInputInit<T extends FieldValues>(
	{
		name,
		control,
		defaultValue,
		rules,
		shouldUnregister,
		onChange,
		onInput,
		...props
	}: FormInputProps<T>,
	ref: ForwardedRef<HTMLInputElement>
) {
	const {
		field: { value, onChange: fieldOnChange, ref: hookRef, ...field },
		fieldState,
	} = useController<T>({
		name,
		control,
		defaultValue,
		rules,
		shouldUnregister,
	});

	return (
		<Input
			ref={ref}
			value={value}
			onInput={(e) => {
				fieldOnChange(e);
				onInput?.(e);
			}}
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

export const FormInput = typedForwardRef(FormInputInit);
