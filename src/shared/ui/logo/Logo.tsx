import { IoNewspaperOutline } from "react-icons/io5";
import { Group } from "@mantine/core";
import Link from "next/link";

import clsx from "clsx";
import s from "./Logo.module.css";

export const Logo = () => {
	return (
		<Link href={"/"}>
			<Group className={s.logo} gap={"xs"}>
				<IoNewspaperOutline className={s.icon} />
				PostiX
			</Group>
		</Link>
	);
};
