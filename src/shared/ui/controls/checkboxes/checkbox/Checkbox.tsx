import { cn } from "@/shared/utils/cn";
import {
	InputLabel,
	Checkbox as MCheckbox,
	Stack,
	type CheckboxProps as MCheckboxProps,
} from "@mantine/core";

export type CheckboxProps = MCheckboxProps & {
	verticalLabel?: boolean;
};

export const Checkbox = (props: CheckboxProps) => {
	const {
		radius = "xs",
		size = "md",
		verticalLabel = false,
		label,
		className,
		...restProps
	} = props;

	const horizontalLabel = verticalLabel ? undefined : label;

	const checkbox = (
		<MCheckbox
			className={cn("w-full")}
			color="violet"
			label={horizontalLabel}
			size={size}
			radius={"xs"}
			{...restProps}
		/>
	);

	if (horizontalLabel) {
		return checkbox;
	}

	return (
		<Stack>
			{verticalLabel ? <InputLabel size={size}>{label}</InputLabel> : null}
			{checkbox}
		</Stack>
	);
};
