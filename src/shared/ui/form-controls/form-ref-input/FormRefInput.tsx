"use client";

import { typedForwardRef } from "@/shared/lib/typedForwardRef";
import { ForwardedRef } from "react";
import {
	useController,
	type UseControllerProps,
	type FieldValues,
} from "react-hook-form";

import { RefInput, type RefInputProps } from "shared/ui/inputs";

export type FormInputProps<T extends FieldValues> = UseControllerProps<T> &
	Omit<RefInputProps, "value" | "defaultValue">;

function FormRefInputInit<T extends FieldValues>(
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
		<RefInput
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

export const FormRefInput = typedForwardRef(FormRefInputInit);
