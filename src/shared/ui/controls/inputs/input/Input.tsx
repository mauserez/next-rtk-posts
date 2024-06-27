"use client";

import { ReactNode, memo, useRef, useDeferredValue } from "react";
import { Group, TextInput, TextInputProps } from "@mantine/core";

import { LuSearch } from "react-icons/lu";
import { MdClear } from "react-icons/md";

import { clearInput } from "@/shared/utils/input";
import { cn } from "@/shared/utils/cn";

export type ExtraInputProps = {
	withPlaceholderIcon?: boolean;
	placeholderIcon?: ReactNode;
	clearIcon?: ReactNode;
	clearable?: boolean;
	isSearch?: boolean;
	noBorder?: boolean;
	noShadow?: boolean;
};

export type InputProps = TextInputProps & ExtraInputProps;

export const Input = (props: InputProps) => {
	const {
		className = "",
		withPlaceholderIcon = false,
		placeholderIcon,
		clearIcon,
		clearable = true,
		isSearch = false,
		value,
		size = "md",
		leftSectionWidth,
		leftSection,
		rightSection,
		rightSectionWidth,
		noBorder = false,
		noShadow = false,
		...restProps
	} = props;

	const clIcon = !clearIcon ? <MdClear /> : clearIcon;
	const inputRef = useRef<HTMLInputElement>(null);
	const deferredValue = useDeferredValue(value);

	const clearValue = () => {
		clearInput(inputRef);
	};

	const leftSectionContent =
		isSearch || leftSection ? (
			<Group
				onClick={() => inputRef.current?.focus()}
				justify="flex-start"
				wrap="nowrap"
				gap="6px"
			>
				{isSearch ? <LuSearch /> : null}
				{leftSection}
			</Group>
		) : null;

	const clearIconContent =
		value?.toString().trim() && clearable ? (
			<div className="cursor-pointer" onClick={clearValue}>
				{clIcon}
			</div>
		) : null;

	const rightSectionContent =
		clearable || rightSection ? (
			<Group
				onClick={() => inputRef.current?.focus()}
				justify="flex-end"
				wrap="nowrap"
				gap="6px"
			>
				{clearIconContent}
				{rightSection}
			</Group>
		) : null;

	return (
		<TextInput
			data-no-border={noBorder}
			data-no-shadow={noShadow}
			size={size}
			ref={inputRef}
			spellCheck={false}
			value={deferredValue}
			leftSectionWidth={leftSectionContent ? leftSectionWidth : 0}
			leftSection={leftSectionContent}
			rightSectionWidth={rightSectionContent ? rightSectionWidth : 0}
			rightSection={rightSectionContent}
			className={cn("w-full", className)}
			{...restProps}
		/>
	);
};

export const MemoInput = memo(Input) as typeof Input;
