"use client";

import { Logo } from "@/shared/ui";
import { Group } from "@mantine/core";
import { ButtonLink } from "@/shared/ui";
import { Button } from "@/shared/ui/controls";

import s from "./Header.module.css";
import { signOut, useSession } from "next-auth/react";

export const Header = () => {
	const { status } = useSession();

	return (
		<header className={s.header}>
			<Group justify="space-between">
				<Logo />
				{status !== "loading" ? (
					status === "authenticated" ? (
						<Button
							onClick={() => signOut({ callbackUrl: "/" })}
							cssVariant="violet"
						>
							Выйти
						</Button>
					) : (
						<ButtonLink href="/login" cssVariant="violet">
							Войти
						</ButtonLink>
					)
				) : null}
			</Group>
		</header>
	);
};
