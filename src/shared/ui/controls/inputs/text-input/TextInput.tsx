"use client";

import { memo, useRef } from "react";

import {
	TextInput as MTextInput,
	TextInputProps as MTextInputProps,
} from "@mantine/core";

import { ExtraInputProps } from "shared/ui/controls/inputs/types";
import { LuSearch } from "react-icons/lu";
import { InputLeftSection, InputRightSection } from "shared/ui/controls/inputs";
import { cn } from "shared/utils/cn";

export type TextInputProps = MTextInputProps & ExtraInputProps;

export const TextInput = (props: TextInputProps) => {
	const {
		className = "",
		clearIcon,
		clearable = true,
		isSearch = false,
		value,
		size = "md",
		leftSectionWidth,
		leftSection,
		rightSection,
		rightSectionWidth,
		variant,
		...restProps
	} = props;

	const inputRef = useRef<HTMLInputElement>(null);
	const searchIcon = isSearch ? <LuSearch /> : null;

	const leftSectionContent = (
		<InputLeftSection leftSection={leftSection} inputRef={inputRef}>
			{searchIcon}
		</InputLeftSection>
	);

	const rightSectionContent = (
		<InputRightSection
			inputRef={inputRef}
			rightSection={rightSection}
			value={value}
		/>
	);

	const unstyled = variant === "unstyled";
	const isLeftSection = searchIcon || leftSection;
	const isRightSection = clearable || rightSection;

	return (
		<MTextInput
			data-no-border={unstyled}
			data-no-shadow={unstyled}
			size={size}
			ref={inputRef}
			spellCheck={false}
			value={value}
			leftSectionWidth={isLeftSection ? leftSectionWidth : 0}
			leftSection={isLeftSection ? leftSectionContent : null}
			rightSectionWidth={isRightSection ? rightSectionWidth : 0}
			rightSection={isRightSection ? rightSectionContent : null}
			className={cn("w-full", className)}
			{...restProps}
		/>
	);
};

export const MemoTextInput = memo(TextInput) as typeof TextInput;
