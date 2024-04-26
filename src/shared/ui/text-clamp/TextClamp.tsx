import { ComponentProps, ReactNode } from "react";
import s from "./TextClamp.module.css";
import clsx from "clsx";

type TextClampProps = {
	children: ReactNode | string;
	lineCount?: number;
} & ComponentProps<"div">;

export const TextClamp = (props: TextClampProps) => {
	const { children, className = "", lineCount = 1, ...otherProps } = props;
	
	return (
		<div
			style={{ WebkitLineClamp: lineCount }}
			className={clsx(s.clamp, className)}
			{...otherProps}
		>
			{children}
		</div>
	);
};
