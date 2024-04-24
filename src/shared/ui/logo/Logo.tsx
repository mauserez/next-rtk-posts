import clsx from "clsx";
import s from "./Logo.module.css";
import { IoNewspaperOutline } from "react-icons/io5";
import { Group } from "@mantine/core";

export const Logo = () => {
	return (
		<Group className={s.logo} gap={"xs"}>
			<IoNewspaperOutline className={s.icon} />
			PostiX
		</Group>
	);
};
