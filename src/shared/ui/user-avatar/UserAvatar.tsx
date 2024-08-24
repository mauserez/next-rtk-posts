"use client";

import { useSessionUser } from "config/nextauth/hooks";
import { Avatar, AvatarProps, PolymorphicComponentProps } from "@mantine/core";
import { cn } from "@/shared/utils/cn";
import s from "./UserAvatar.module.css";

type UserAvatarProps = PolymorphicComponentProps<"div", AvatarProps>;
export const UserAvatar = (props: UserAvatarProps) => {
	const { className = "", radius = "lg", size = 48, ...otherProps } = props;
	const user = useSessionUser();

	if (!user) {
		return (
			<Avatar
				radius="sm"
				className={cn(
					s.avatar,
					s.avatarBtn,
					className,
					"w-auto px-3 hover:bg-violet-500"
				)}
				onClick={(e) => (props.onClick ? props?.onClick(e) : null)}
			>
				Войти
			</Avatar>
		);
	}

	return (
		<Avatar
			size={size}
			className={cn(s.avatar, className)}
			radius={radius}
			{...otherProps}
		>
			{user?.username.charAt(0).toUpperCase()}
		</Avatar>
	);
};
