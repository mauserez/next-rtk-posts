"use client";

import { Menu } from "@mantine/core";
import { UserAvatar } from "@/shared/ui";
import { IoCloudUploadOutline, IoExitOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";

export const ProfileCardAvatar = () => {
	return (
		<Menu trigger="click" radius="sm">
			<Menu.Target>
				<div>
					<UserAvatar />
				</div>
			</Menu.Target>
			<Menu.Dropdown className="flex flex-col gap-2 px-3 pb-3 [&>*]:font-medium">
				<Menu.Item leftSection={<IoCloudUploadOutline />}>
					Загрузить фото
				</Menu.Item>

				<Menu.Item
					color="red"
					onClick={() => signOut({ callbackUrl: "/" })}
					leftSection={<IoExitOutline />}
				>
					Выйти
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};
