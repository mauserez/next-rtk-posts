import {
	Group,
	Button as MButton,
	ButtonProps as MButtonProps,
	PolymorphicComponentProps,
} from "@mantine/core";

import { LuLoader } from "react-icons/lu";
import { IconBaseProps, IconType } from "react-icons/lib";

import { cn } from "@/shared/utils/cn";
import s from "./Button.module.css";

export type ButtonProps = PolymorphicComponentProps<"button", MButtonProps> & {
	isLoading?: boolean;
	loader?: IconType;
};

export const Button = (props: ButtonProps) => {
	const {
		children,
		isLoading = false,
		className,
		loader = null,
		loaderProps,
		...btnProps
	} = props;

	return (
		<MButton className={cn(s.button, className)} {...btnProps}>
			<Group gap={8}>
				{isLoading ? (
					<Loader loader={loader} className="rotate-animation" size={16} />
				) : null}
				{children}
			</Group>
		</MButton>
	);
};

type LoaderProps = {
	loader?: IconType | null;
} & IconBaseProps;

const Loader = (props: LoaderProps) => {
	const { loader: IconLoader = null, ...otherProps } = props;
	return IconLoader === null ? (
		<LuLoader {...otherProps} />
	) : (
		<IconLoader {...otherProps} />
	);
};
