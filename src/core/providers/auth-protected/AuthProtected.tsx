"use client";
import { ReactNode } from "react";

import { Stack, Group } from "@mantine/core";
import { LoginForm } from "widgets/login-form/LoginForm";

import { usePathname } from "next/navigation";
import { useIsAuthenticated } from "@/core/nextauth/hooks";
import { ButtonLink } from "@/shared/ui/buttons";

import { cn } from "@/shared/utils/cn";
import s from "./AuthProtected.module.css";

const protectedRoutes = ["/albums", "/posts"];

type AuthProtectedProps = { children: ReactNode };

export const AuthProtected = (props: AuthProtectedProps) => {
	const { children } = props;
	const pathName = usePathname();

	const isAuth = useIsAuthenticated();
	const isNotAllowed =
		protectedRoutes.some((route) => pathName.startsWith(route)) && !isAuth;

	if (!isNotAllowed) {
		return <>{children}</>;
	}

	const text = isAuth
		? "Обратитесь к администратору"
		: "Сначала авторизуйтесь, если не поможет обратитесь к администратору";

	return (
		<div className={s.card}>
			<Group gap={24}>
				<Stack className={"w-[470px]"} gap={16}>
					<Group gap={16} align="flex-end">
						<div className={cn(s.errorNum)}>403</div>
						<ButtonLink className="mb-8" href="/">
							На главную
						</ButtonLink>
					</Group>
					<div>
						У вас не хватает прав для просмотра этой страницы. <br />
						{text}
					</div>
				</Stack>
				{!isAuth ? <LoginForm className={"w-[330px]"} /> : null}
			</Group>
		</div>
	);
};
