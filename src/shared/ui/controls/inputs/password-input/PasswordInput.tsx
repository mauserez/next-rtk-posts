"use client";

import { memo, useRef } from "react";

import {
	PasswordInput as MPasswordInput,
	PasswordInputProps as MPasswordInputProps,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import {
	ExtraInputProps,
	InputLeftSection,
	InputRightSection,
} from "@/shared/ui/controls/inputs";

import { cn } from "@/shared/utils/cn";

export type PasswordInputProps = MPasswordInputProps &
	Omit<ExtraInputProps, "isSearch">;

export const PasswordInput = (props: PasswordInputProps) => {
	const [visible, { toggle }] = useDisclosure(false);

	const {
		className = "",
		clearIcon,
		clearable = true,
		value,
		variant,
		size = "md",
		leftSection,
		leftSectionWidth,
		rightSection,
		rightSectionWidth,
		...restProps
	} = props;

	const inputRef = useRef<HTMLInputElement>(null);

	const leftSectionContent = (
		<InputLeftSection leftSection={leftSection} inputRef={inputRef} />
	);

	const visibilityIconContent = (
		<div className="cursor-pointer" onClick={toggle}>
			{visible ? <MdVisibilityOff /> : <MdVisibility />}
		</div>
	);

	const rightSectionContent = (
		<InputRightSection
			inputRef={inputRef}
			rightSection={rightSection}
			value={value}
		>
			{visibilityIconContent}
		</InputRightSection>
	);

	const unstyled = variant === "unstyled";
	const isLeftSection = leftSection;
	const isRightSection = clearable || rightSection;

	return (
		<MPasswordInput
			data-no-border={unstyled}
			data-no-shadow={unstyled}
			value={value}
			size={size}
			ref={inputRef}
			spellCheck={false}
			leftSectionWidth={isLeftSection ? leftSectionWidth : 0}
			leftSection={isLeftSection ? leftSectionContent : null}
			rightSectionWidth={isRightSection ? rightSectionWidth : 0}
			rightSection={isRightSection ? rightSectionContent : null}
			className={cn("w-full", className)}
			visible={visible}
			{...restProps}
		/>
	);
};

export const MemoPasswordInput = memo(PasswordInput) as typeof PasswordInput;
