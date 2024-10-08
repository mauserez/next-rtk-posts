"use client";

import { useDisclosure } from "@mantine/hooks";
import { Drawer, NavLink, Stack } from "@mantine/core";
import { BsList } from "react-icons/bs";
import { menuItems, type MenuItem } from "widgets/menu-drawer/lib/menuItems";
import { uid } from "shared/lib/number";
import { usePathname, useRouter } from "next/navigation";
import s from "widgets/menu-drawer/ui/MenuDrawer.module.css";

export function MenuDrawer() {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Drawer opened={opened} onClose={close} size={400} title="">
				<Stack>
					<DrawMenu handle={close} menu={menuItems} />
				</Stack>
			</Drawer>

			<BsList className={s.menuIcon} onClick={open} color="#bbb" size={24} />
		</>
	);
}

type DrawMenuProps = { menu: MenuItem[]; handle: () => void };

export function DrawMenu(props: DrawMenuProps) {
	const { menu, handle } = props;
	const path = usePathname();
	const router = useRouter();

	return menu.map((item) => {
		const isChildActive = isChildActiveUrl(path, item);
		const { href, ...withoutHref } = item;

		return item.childs ? (
			<NavLink
				defaultOpened={!!isChildActive}
				href=""
				variant="subtle"
				key={uid()}
				{...withoutHref}
			>
				<DrawMenu handle={handle} menu={item.childs} />
			</NavLink>
		) : (
			<NavLink
				onClick={(e) => {
					e.preventDefault();
					router.push(item.href);
					handle();
				}}
				key={uid()}
				active={path === item.href}
				variant="subtle"
				{...item}
			/>
		);
	});
}

const isChildActiveUrl = (path: string, menuItem: MenuItem) => {
	let result = 0;
	result += path === menuItem.href ? 1 : 0;
	const childs = menuItem.childs || [];

	if (childs.length > 0) {
		childs.map((c) => {
			result += isChildActiveUrl(path, c);
		});
	}

	return result;
};
