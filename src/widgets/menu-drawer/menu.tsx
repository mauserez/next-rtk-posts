import { ReactNode } from "react";
import { BiHomeAlt2, BiTable } from "react-icons/bi";
import { IconType } from "react-icons/lib";
import { LuLayoutDashboard } from "react-icons/lu";

import { PolymorphicComponentProps, NavLinkProps } from "@mantine/core";

export type MenuItem = PolymorphicComponentProps<"a", NavLinkProps> & {
	href: string;
	label: string;
	childs?: MenuItem[];
	icon?: ReactNode | IconType;
};

export const menu: MenuItem[] = [
	{ href: "/", label: "Home", leftSection: <BiHomeAlt2 /> },
	{
		href: "/country/list",
		label: "Country Table",
		leftSection: <BiTable />,
	},
	{
		href: "",
		label: "Kanban",
		leftSection: <LuLayoutDashboard />,
		childs: [
			{ href: "/kanban/report", label: "Report" },
			{
				href: "/kanban/board",
				label: "Board",
			},
		],
	},
];
