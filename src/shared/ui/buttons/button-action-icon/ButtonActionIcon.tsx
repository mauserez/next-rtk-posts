import {
	ActionIcon as MActionIcon,
	ActionIconProps as MActionIconProps,
	PolymorphicComponentProps,
} from "@mantine/core";

import { cn } from "@/shared/lib/cn";
import s from "shared/ui/buttons/button-action-icon/ButtonActionIcon.module.css";

type ButtonActionIconProps = PolymorphicComponentProps<
	"button",
	MActionIconProps
>;

export const ButtonActionIcon = (props: ButtonActionIconProps) => {
	const { className, color = "#ffffff" } = props;

	return (
		<MActionIcon color={color} className={cn(className, s.btn)} {...props} />
	);
};
