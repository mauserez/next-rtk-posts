"use client";

import { ProfileCard } from "@/entities/profile/ui/index";
import { UserAvatar } from "@/shared/ui";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export const ProfileCardDrawer = () => {
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
};
