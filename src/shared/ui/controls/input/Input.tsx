"use client";

import { ChangeEvent, ReactNode, memo, useRef } from "react";
import { Group, TextInput, TextInputProps } from "@mantine/core";

import { LuSearch } from "react-icons/lu";
import { MdClear } from "react-icons/md";

import { clearInput } from "@/shared/utils/input";
import { cn } from "@/shared/utils/cn";
import s from "./Input.module.css";

export type ExtraInputProps = {
	withPlaceholderIcon?: boolean;
	placeholderIcon?: ReactNode;
	value?: string;
	clearIcon?: ReactNode;
	clearable?: boolean;
};

export type InputProps = TextInputProps & ExtraInputProps;

export const Input = (props: InputProps) => {
	const {
		className = "",
		withPlaceholderIcon = false,
		placeholderIcon,
		clearIcon,
		clearable,
		onChange,
		value,
		defaultValue,
		size = "md",
		leftSection,
		rightSection,
		rightSectionWidth = "13px",
		...restProps
	} = props;

	const plcIcon = withPlaceholderIcon ? <LuSearch /> : placeholderIcon;
	const clIcon = !clearIcon ? <MdClear /> : clearIcon;
	const inputRef = useRef<HTMLInputElement>(null);

	const valueChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e);
	};

	const clearValue = () => {
		clearInput(inputRef);
	};

	console.log(value);
	console.log(defaultValue);

	const clearIconContent = value?.trim() ? (
		<div className="cursor-pointer" onClick={clearValue}>
			{clIcon}
		</div>
	) : null;

	const plcIconContent = !value?.trim() ? (
		<div onClick={() => inputRef.current?.focus()}>{plcIcon}</div>
	) : null;

	const rightSectionContent = (
		<Group
			onClick={() => inputRef.current?.focus()}
			className={cn("w-full h-full pr-[13px]")}
			justify="flex-end"
			wrap="nowrap"
			gap="6px"
		>
			{clearIconContent}
			{rightSection}
		</Group>
	);

	const rightSectionPadding = `${rightSectionWidth}`;

	return (
		<TextInput
			size={size}
			styles={{ "input": { paddingRight: rightSectionPadding } }}
			ref={inputRef}
			spellCheck={false}
			defaultValue={defaultValue}
			value={value}
			onChange={valueChange}
			leftSection={plcIcon ? plcIconContent : leftSection}
			rightSectionWidth={rightSectionWidth}
			rightSection={rightSectionContent}
			className={cn(
				{
					[s.withPlaceholderIcon]: withPlaceholderIcon,
				},
				"w-full",
				className
			)}
			{...restProps}
		/>
	);
};

export const MemoInput = memo(Input) as typeof Input;
