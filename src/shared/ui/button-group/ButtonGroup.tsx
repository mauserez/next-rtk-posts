"use client";

import { Group, GroupProps } from "@mantine/core";
import { ReactNode, useState } from "react";
import { Button, ButtonProps } from "..";
import { v4 as uuidv4 } from "uuid";
import { PrimitiveType } from "@/shared/types";
import clsx from "clsx";

import s from "./ButtonGroup.module.css";

type AssocButtons = { value: PrimitiveType; label: string | ReactNode }[];

type ButtonGroupTypes = {
	buttonProps?: ButtonProps;
	buttonGroupProps?: GroupProps;
	buttons: AssocButtons;
	activeClassName?: string;
	onClick?: (value: PrimitiveType) => void;
};

export const ButtonGroup = (props: ButtonGroupTypes) => {
	const {
		buttonProps,
		buttonGroupProps,
		buttons,
		activeClassName = s.active,
		onClick,
	} = props;

	const [active, setActive] = useState(0);

	const controls = buttons.map((item, index) => (
		<Button
			key={uuidv4()}
			className={clsx({
				[activeClassName]: active === index,
				[buttonProps?.className || ""]: true,
			})}
			onClick={() => {
				setActive(index);

				if (onClick) {
					onClick(item.value);
				}
			}}
		>
			{item.label}
		</Button>
	));

	return <Group {...buttonGroupProps}>{controls}</Group>;
};
