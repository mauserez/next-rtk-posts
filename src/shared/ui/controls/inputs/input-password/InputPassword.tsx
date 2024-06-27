"use client";

import { memo, useRef } from "react";
import { Group, PasswordInput, PasswordInputProps } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

import { LuSearch } from "react-icons/lu";
import { MdClear, MdVisibility, MdVisibilityOff } from "react-icons/md";

import { ExtraInputProps } from "@/shared/ui/controls/inputs";
import { clearInput } from "@/shared/utils/input";
import { cn } from "@/shared/utils/cn";

export type InputPasswordProps = PasswordInputProps & ExtraInputProps;

export const InputPassword = (props: InputPasswordProps) => {
	const [visible, { toggle }] = useDisclosure(false);

	const {
		className = "",
		withPlaceholderIcon = false,
		placeholderIcon,
		clearIcon,
		clearable = true,
		isSearch = false,
		value,
		size = "md",
		leftSection,
		leftSectionWidth,
		rightSection,
		rightSectionWidth,
		...restProps
	} = props;

	const clIcon = !clearIcon ? <MdClear /> : clearIcon;
	const inputRef = useRef<HTMLInputElement>(null);

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

	const visibilityIconContent = (
		<div className="cursor-pointer" onClick={toggle}>
			{visible ? <MdVisibilityOff /> : <MdVisibility />}
		</div>
	);

	const rightSectionContent = (
		<Group
			onClick={() => inputRef.current?.focus()}
			justify="center"
			wrap="nowrap"
			gap="6px"
		>
			{rightSection}
			{clearIconContent}
			{visibilityIconContent}
		</Group>
	);

	return (
		<PasswordInput
			value={value}
			size={size}
			ref={inputRef}
			spellCheck={false}
			leftSectionWidth={leftSectionContent ? leftSectionWidth : 0}
			leftSection={leftSectionContent}
			rightSectionWidth={rightSectionContent ? rightSectionWidth : 0}
			rightSection={rightSectionContent}
			className={cn("w-full", className)}
			visible={visible}
			{...restProps}
		/>
	);
};

export const MemoInputPassword = memo(InputPassword) as typeof InputPassword;
