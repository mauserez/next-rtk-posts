import { Group } from "@mantine/core";
import Link from "next/link";
import { MenuDrawer } from "@/widgets/menu-drawer/ui/MenuDrawer";

import s from "./Logo.module.css";

export const Logo = () => {
	return (
		<Group gap={16}>
			<MenuDrawer />
			<Link href={"/"}>
				<Group className={s.logo} gap={"xs"}>
					PostiX
				</Group>
			</Link>
		</Group>
	);
};
