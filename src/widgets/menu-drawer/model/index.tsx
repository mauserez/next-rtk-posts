import { ReactNode } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { IconType } from "react-icons/lib";
import { LuLayoutDashboard } from "react-icons/lu";

import { PolymorphicComponentProps, NavLinkProps } from "@mantine/core";

export type RouteMapItem = PolymorphicComponentProps<"a", NavLinkProps> & {
	href: string;
	label: string;
	childs?: RouteMapItem[];
	icon?: ReactNode | IconType;
};

export const RouteMap: RouteMapItem[] = [
	{ href: "/", label: "Home", leftSection: <BiHomeAlt2 /> },
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
