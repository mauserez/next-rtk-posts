"use client";

import { Group, GroupProps } from "@mantine/core";
import { ReactNode, useState } from "react";
import { Button, ButtonProps } from "shared/ui/buttons";
import { uid } from "@/shared/lib/number";
import { PrimitiveType } from "shared/types";
import clsx from "clsx";

import s from "shared/ui/button-group/ButtonGroup.module.css";

type AssocButton = {
	value: PrimitiveType;
	label: string | ReactNode;
};

type AssocButtons = AssocButton[];

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

	const buttonList = buttons.map((item, index) => (
		<Button
			key={uid()}
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

	return <Group {...buttonGroupProps}>{buttonList}</Group>;
};
