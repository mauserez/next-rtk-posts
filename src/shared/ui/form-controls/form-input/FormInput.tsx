"use client";

import { mergeRefs } from "@mantine/hooks";
import { ForwardedRef, forwardRef, type Ref } from "react";
import {
	useController,
	type UseControllerProps,
	type FieldValues,
} from "react-hook-form";

import { Input, type InputProps } from "shared/ui/controls/inputs";

export type FormInputProps<T extends FieldValues> = UseControllerProps<T> &
	Omit<InputProps, "value" | "defaultValue"> & { inputRef?: Ref<unknown> };

export const FormInput = forwardRef(function FormInput<T extends FieldValues>(
	{
		name,
		control,
		defaultValue,
		rules,
		shouldUnregister,
		inputRef,
		onChange,
		onInput,
		...props
	}: FormInputProps<T>,
	ref: ForwardedRef<unknown>
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

	const mergedRef = mergeRefs(ref, hookRef);

	return (
		<Input
			ref={mergedRef}
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
});
/*


export function FormInput<T extends FieldValues>({
	name,
	control,
	defaultValue,
	rules,
	shouldUnregister,
	inputRef,
	onChange,
	onInput,
	...props
}: FormInputProps<T>) {
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

	const mergedRef = mergeRefs(inputRef, hookRef);

	return (
		<Input
			ref={mergedRef}
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
 */
