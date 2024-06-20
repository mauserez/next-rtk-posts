import {
	Avatar,
	AvatarProps,
	PolymorphicComponentProps,
	Menu,
} from "@mantine/core";
import { IoCloudUploadOutline, IoExitOutline } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";

import { cn } from "@/shared/utils/cn";
import s from "./ProfileCardAvatar.module.css";

type ProfileCardAvatarProps = PolymorphicComponentProps<"div", AvatarProps>;
export const ProfileCardAvatar = (props: ProfileCardAvatarProps) => {
	const { className = "", radius = "lg", size = 48, ...otherProps } = props;

	return (
		<Menu trigger="click" radius="sm">
			<Menu.Target>
				<Avatar
					size={size}
					className={cn(s.avatar, className)}
					radius={radius}
					{...otherProps}
				>
					O
				</Avatar>
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
