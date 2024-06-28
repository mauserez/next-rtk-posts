import {
	Checkbox as MCheckbox,
	type CheckboxProps as MCheckboxProps,
} from "@mantine/core";

export type CheckboxProps = MCheckboxProps;
export const Checkbox = (props: CheckboxProps) => {
	return <MCheckbox {...props} />;
};
