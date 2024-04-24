import { ComponentProps, ReactNode } from "react";
import { Group } from "@mantine/core";

import clsx from "clsx";
import s from "./SectionTitle.module.css";

type SectionTitleProps = {
	boldText?: string | ReactNode;
	lightText?: string | ReactNode;
	size?: "md" | "sm";
} & ComponentProps<"div">;

export const SectionTitle = (props: SectionTitleProps) => {
	const { className = "", boldText = "", lightText = "", size = "md" } = props;
	return (
		<Group justify="space-between" className={className}>
			<div className={clsx(s[size])}>
				<span className={s.bold}>{boldText}</span>&nbsp;
				<span className={s.light}>{lightText}</span>
			</div>
		</Group>
	);
};
