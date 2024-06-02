import { ComponentProps, ReactNode } from "react";
import s from "./TextClamp.module.css";
import clsx from "clsx";

type TextClampProps = {
	children: ReactNode | string;
	lineCount?: number;
	uppercase?: boolean;
} & ComponentProps<"div">;

export const TextClamp = (props: TextClampProps) => {
	const {
		children,
		className = "",
		uppercase = false,
		lineCount = 1,
		...otherProps
	} = props;

	return (
		<div
			style={{ WebkitLineClamp: lineCount }}
			className={clsx({
				[s.clamp]: true,
				[className]: true,
			})}
			{...otherProps}
		>
			<div className={clsx({ [s.uppercase]: true })}>{children}</div>
		</div>
	);
};
