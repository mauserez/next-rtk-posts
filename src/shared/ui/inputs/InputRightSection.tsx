import { ReactNode, RefObject, AwaitedReactNode } from "react";
import { clearInput } from "shared/lib/input";
import { ExtraInputProps } from "shared/ui/inputs/types";
import { Group } from "@mantine/core";
import { MdClear } from "react-icons/md";

type RightSectionType = {
	inputRef: RefObject<HTMLInputElement>;
	value: string | number | readonly string[] | undefined;
	rightSection: ReactNode;
	clearable?: ExtraInputProps["clearable"];
	children?: ReactNode;
	clearIcon?:
		| string
		| number
		| bigint
		| true
		| JSX.Element
		| Iterable<ReactNode>
		| Promise<AwaitedReactNode>;
};

export function InputRightSection(props: RightSectionType) {
	const {
		inputRef,
		value,
		clearable = true,
		children,
		clearIcon,
		rightSection,
	} = props;

	if (!rightSection && !children && !clearable) {
		return null;
	}

	const clIcon = !clearIcon ? <MdClear /> : clearIcon;

	const clearValue = () => {
		clearInput(inputRef);
	};

	const clearIconContent =
		value?.toString().trim() && clearable ? (
			<div
				className="cursor-pointer"
				onClick={(e) => {
					e.stopPropagation();
					clearValue();
				}}
			>
				{clIcon}
			</div>
		) : null;

	if (clearable || rightSection) {
		return (
			<Group
				onClick={() => inputRef.current?.focus()}
				justify="flex-end"
				wrap="nowrap"
				gap="6px"
				className="w-full px-2.5"
			>
				{rightSection}
				{clearIconContent}
				{children}
			</Group>
		);
	}

	return null;
}
