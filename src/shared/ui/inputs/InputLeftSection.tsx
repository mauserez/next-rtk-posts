import { Group } from "@mantine/core";
import { ReactNode, RefObject } from "react";

type LeftSectionProps = {
	inputRef: RefObject<HTMLInputElement>;
	leftSection: ReactNode;
	children?: ReactNode;
};

export function InputLeftSection(props: LeftSectionProps) {
	const { inputRef, leftSection, children } = props;

	if (!leftSection && !children) {
		console.log("here");
		return null;
	}

	return (
		<Group
			onClick={() => inputRef.current?.focus()}
			justify="flex-start"
			wrap="nowrap"
			gap="6px"
		>
			{children}
			{leftSection}
		</Group>
	);
}
