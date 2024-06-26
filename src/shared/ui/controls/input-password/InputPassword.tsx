"use client";

import { ChangeEvent, useRef } from "react";
import { Group, PasswordInput, PasswordInputProps } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

import { LuSearch } from "react-icons/lu";
import { MdClear, MdVisibility, MdVisibilityOff } from "react-icons/md";

import { ExtraInputProps } from "@/shared/ui/controls";
import { clearInput } from "@/shared/utils/input";
import { cn } from "@/shared/utils/cn";
import s from "@/shared/ui/controls/input/Input.module.css";

export type InputPasswordProps = PasswordInputProps & ExtraInputProps;

export const InputPassword = (props: InputPasswordProps) => {
	const [visible, { toggle }] = useDisclosure(false);

	const {
		className = "",
		withPlaceholderIcon = false,
		placeholderIcon,
		clearIcon,
		onChange,
		value,
		size = "md",
		leftSection,
		rightSection,
		rightSectionWidth = "61px",
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

	const clearIconContent = value?.trim() ? (
		<div className="cursor-pointer" onClick={clearValue}>
			{clIcon}
		</div>
	) : null;

	const plcIconContent = !value?.trim() ? (
		<div onClick={() => inputRef.current?.focus()}>{plcIcon}</div>
	) : null;

	const visibilityIconContent = (
		<div className="cursor-pointer" onClick={toggle}>
			{visible ? <MdVisibilityOff /> : <MdVisibility />}
		</div>
	);

	const rightSectionContent = (
		<Group
			onClick={() => inputRef.current?.focus()}
			className={cn("w-full h-full pr-[13px]")}
			justify="flex-end"
			wrap="nowrap"
			gap="6px"
		>
			{rightSection}
			{clearIconContent}
			{visibilityIconContent}
		</Group>
	);

	const rightSectionPadding = `${rightSectionWidth}`;

	return (
		<PasswordInput
			size={size}
			styles={{ "input": { paddingRight: rightSectionPadding } }}
			visible={visible}
			ref={inputRef}
			spellCheck={false}
			value={value}
			onChange={valueChange}
			leftSection={plcIcon ? plcIconContent : leftSection}
			rightSectionWidth={rightSectionWidth}
			rightSection={rightSectionContent}
			className={cn(
				{ [s.withPlaceholderIcon]: withPlaceholderIcon },
				"w-full",
				className
			)}
			{...restProps}
		/>
	);
};
