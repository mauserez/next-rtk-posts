"use client";

import { ReactNode } from "react";

import { Stack, Group } from "@mantine/core";
import { LoginForm } from "widgets/login-form";

import { usePathname } from "next/navigation";
import { useIsAuthenticated } from "config/nextauth/hooks";
import { ButtonLink } from "shared/ui/buttons";

import { cn } from "shared/lib/cn";
import s from "config/providers/auth-protected/AuthProtected.module.css";
import { useSession } from "next-auth/react";

const protectedRoutes = ["/albums", "/posts", "/country"];

type AuthProtectedProps = { children: ReactNode };

export function AuthProtected(props: AuthProtectedProps) {
	const { children } = props;
	const pathName = usePathname();

	const session = useSession();
	const isAuth = useIsAuthenticated();
	const isNotAllowed =
		protectedRoutes.some((route) => pathName.startsWith(route)) && !isAuth;

	if (session.status === "loading") {
		return null;
	}

	if (!isNotAllowed) {
		return children;
	}

	const text = isAuth
		? "Обратитесь к администратору"
		: "Сначала авторизуйтесь, если не поможет обратитесь к администратору";

	return (
		<div className={s.card}>
			<Group gap={24}>
				<Stack className="w-[470px]" gap={16}>
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
				{!isAuth ? <LoginForm className="w-[330px]" /> : null}
			</Group>
		</div>
	);
}
