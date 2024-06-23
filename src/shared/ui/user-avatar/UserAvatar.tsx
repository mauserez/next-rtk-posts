"use client";

import { useSessionUser } from "@/core/nextauth/hooks";
import { Avatar, AvatarProps, PolymorphicComponentProps } from "@mantine/core";
import { cn } from "@/shared/utils/cn";
import s from "./UserAvatar.module.css";

type UserAvatarProps = PolymorphicComponentProps<"div", AvatarProps>;
export const UserAvatar = (props: UserAvatarProps) => {
	const { className = "", radius = "lg", size = 48, ...otherProps } = props;
	const user = useSessionUser();

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
