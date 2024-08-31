"use client";

import { ProfileCard } from "entities/profile";
import { UserAvatar } from "shared/ui";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function ProfileCardDrawer() {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Drawer
				position="right"
				opened={opened}
				onClose={close}
				size={450}
				title=""
			>
				<ProfileCard />
			</Drawer>

			<UserAvatar top={12} onClick={open} />
		</>
	);
}
