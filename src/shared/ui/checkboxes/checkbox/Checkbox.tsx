import {
	InputLabel,
	Checkbox as MCheckbox,
	Stack,
	type CheckboxProps as MCheckboxProps,
} from "@mantine/core";

import { cn } from "@/shared/lib/cn";

export type CheckboxProps = MCheckboxProps & {
	verticalLabel?: boolean;
	bodyClassName?: string;
	labelClassName?: string;
};

export const Checkbox = (props: CheckboxProps) => {
	const {
		radius = "xs",
		size = "md",
		verticalLabel = false,
		label,
		className,
		bodyClassName,
		labelClassName,
		...restProps
	} = props;

	const horizontalLabel = verticalLabel ? undefined : label;

	const checkbox = (
		<MCheckbox
			classNames={{
				body: cn("flex gap-3", bodyClassName),
				label: cn("pl-0", labelClassName),
			}}
			className={cn(`w-full flex`, className)}
			color="violet"
			label={horizontalLabel}
			size={size}
			radius="xs"
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
