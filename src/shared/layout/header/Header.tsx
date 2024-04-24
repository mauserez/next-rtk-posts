import clsx from "clsx";
import s from "./Header.module.css";
import { Logo } from "@/shared/ui";
import { Group } from "@mantine/core";

export const Header = () => {
	return (
		<header>
			<Group justify="space-between">
				<Logo />
			</Group>
		</header>
	);
};
