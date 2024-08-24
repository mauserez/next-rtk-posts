import { Group } from "@mantine/core";
import { ReactNode, RefObject } from "react";

type LeftSectionPropsType = {
	inputRef: RefObject<HTMLInputElement>;
	leftSection: ReactNode;
	children?: ReactNode;
};

export const InputLeftSection = (props: LeftSectionPropsType) => {
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
};
