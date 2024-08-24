"use client";

import { memo, useRef } from "react";
import {
	NumberInput as MNumberInput,
	NumberInputProps as MNumberInputProps,
} from "@mantine/core";

import { ExtraInputProps } from "shared/ui/inputs/types";
import { InputLeftSection, InputRightSection } from "shared/ui/inputs";
import { cn } from "@/shared/utils/cn";

export type NumberInputProps = MNumberInputProps &
	Omit<ExtraInputProps, "isSearch">;

export const NumberInput = (props: NumberInputProps) => {
	const {
		className = "",
		clearIcon,
		clearable = true,
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

	const leftSectionContent = (
		<InputLeftSection leftSection={leftSection} inputRef={inputRef} />
	);

	const rightSectionContent = (
		<InputRightSection
			inputRef={inputRef}
			rightSection={rightSection}
			value={value}
		/>
	);

	const unstyled = variant === "unstyled";
	const isLeftSection = leftSection;
	const isRightSection = clearable || rightSection;

	return (
		<MNumberInput
			data-no-border={unstyled}
			data-no-shadow={unstyled}
			size={size}
			ref={inputRef}
			spellCheck={false}
			value={value}
			variant={variant}
			leftSectionWidth={isLeftSection ? leftSectionWidth : 0}
			leftSection={isLeftSection ? leftSectionContent : null}
			rightSectionWidth={isRightSection ? rightSectionWidth : 0}
			rightSection={isRightSection ? rightSectionContent : null}
			className={cn("w-full", className)}
			{...restProps}
		/>
	);
};

export const MemoNumberInput = memo(NumberInput) as typeof NumberInput;
