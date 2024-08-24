"use client";

import { memo, forwardRef, useRef } from "react";
import { mergeRefs } from "@mantine/hooks";
import { LuSearch } from "react-icons/lu";

import {
	InputBase as MInput,
	InputBaseProps as MInputProps,
	PolymorphicComponentProps,
} from "@mantine/core";

import { ExtraInputProps } from "shared/ui/inputs/types";
import { InputLeftSection, InputRightSection } from "shared/ui/inputs";
import { cn } from "@/shared/utils/cn";

export type RefInputProps = PolymorphicComponentProps<"input", MInputProps> &
	ExtraInputProps;

export const RefInput = forwardRef(function Input(props: RefInputProps, ref) {
	const {
		className = "",
		clearIcon,
		clearable = true,
		isSearch = false,
		value,
		variant,
		size = "md",
		leftSectionWidth,
		leftSection,
		rightSection,
		rightSectionWidth,
		...restProps
	} = props;

	const inputRef = useRef<HTMLInputElement>(null);
	const searchIcon = isSearch ? <LuSearch /> : null;

	const leftSectionContent = (
		<InputLeftSection inputRef={inputRef} leftSection={leftSection}>
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
		<MInput
			data-no-border={unstyled}
			data-no-shadow={unstyled}
			size={size}
			ref={mergeRefs(inputRef, ref)}
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
});

export const MemoRefInput = memo(RefInput) as typeof RefInput;
