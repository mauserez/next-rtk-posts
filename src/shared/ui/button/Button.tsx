import {
	Group,
	Button as MButton,
	ButtonProps as MButtonProps,
	PolymorphicComponentProps,
} from "@mantine/core";

import clsx from "clsx";
import s from "./Button.module.css";
import { LuLoader } from "react-icons/lu";

export type ButtonProps = PolymorphicComponentProps<"button", MButtonProps> & {
	isLoading?: boolean;
};

export const Button = (props: ButtonProps) => {
	const { children, isLoading = false, className, ...btnProps } = props;

	return (
		<MButton className={clsx(s.button, className)} {...btnProps}>
			<Group gap={8}>
				{isLoading ? <LuLoader className="rotate-animation" size={16} /> : null}
				{children}
			</Group>
		</MButton>
	);
};
