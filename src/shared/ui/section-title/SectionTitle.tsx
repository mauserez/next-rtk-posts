import { ReactNode } from "react";
import { Group, GroupProps } from "@mantine/core";

import clsx from "clsx";
import s from "shared/ui/section-title/SectionTitle.module.css";

type SectionTitleProps = {
	boldText?: string | ReactNode;
	lightText?: string | ReactNode;
	size?: "xs" | "sm" | "md" | "lg";
	uppercase?: boolean;
} & GroupProps;

export function SectionTitle(props: SectionTitleProps) {
	const {
		className = "",
		boldText = "",
		lightText = "",
		size = "md",
		uppercase = false,
		...otherProps
	} = props;

	return (
		<Group justify="space-between" className={className} {...otherProps}>
			<Group gap={12} className={clsx(s[size])}>
				<p
					className={clsx({
						[s.bold]: true,
						["first-letter:uppercase"]: uppercase,
					})}
				>
					{boldText}
				</p>

				{lightText ? <p className={s.light}>{lightText}</p> : null}
			</Group>
		</Group>
	);
}
