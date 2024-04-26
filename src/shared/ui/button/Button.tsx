import {
	Button as MButton,
	ButtonProps as MButtonProps,
	PolymorphicComponentProps,
} from "@mantine/core";

import clsx from "clsx";
import s from "./Button.module.css";

export type ButtonProps = PolymorphicComponentProps<"button", MButtonProps>;

export const Button = (props: ButtonProps) => {
	const { children, className, ...btnProps } = props;

	return (
		<MButton className={clsx(s.button, className)} {...btnProps}>
			{children}
		</MButton>
	);
};
