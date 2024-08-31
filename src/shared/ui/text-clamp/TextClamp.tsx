import { ComponentProps, ReactNode } from "react";
import s from "shared/ui/text-clamp/TextClamp.module.css";
import clsx from "clsx";

type TextClampProps = {
	children: ReactNode | string;
	lineCount?: number;
	firstLetterUppercase?: boolean;
} & ComponentProps<"div">;

export function TextClamp(props: TextClampProps) {
	const {
		children,
		className = "",
		firstLetterUppercase = false,
		lineCount = 1,
		...restProps
	} = props;

	return (
		<div
			style={{ WebkitLineClamp: lineCount }}
			className={clsx({
				[s.clamp]: true,
				[className]: true,
			})}
			{...restProps}
		>
			<div className={clsx({ [s.uppercase]: firstLetterUppercase })}>
				{children}
			</div>
		</div>
	);
}
