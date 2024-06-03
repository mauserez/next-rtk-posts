"use client";

import { ProfileCard, ProfileCardAvatar } from "@/entities/profile/ui/index";
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

			<ProfileCardAvatar top={10} onClick={open} />
		</>
	);
};
