"use client";

import { Logo } from "@/shared/ui";
import { Group } from "@mantine/core";
import { ButtonLink } from "@/shared/ui";
import { Button } from "@/shared/ui/controls";
import { useEffect } from "react";

import s from "./Header.module.css";
import { signOut, useSession } from "next-auth/react";

export const Header = () => {
	const { status } = useSession();

	useEffect(() => {
		const body = document.querySelector("body");

		const resize_ob = new ResizeObserver(function (entries) {
			const scrollHeight = body?.scrollHeight || 0;
			const clientHeight = body?.clientHeight || 0;

			if (scrollHeight > clientHeight) {
				body?.classList.add("has-scroll");
			} else {
				body?.classList.remove("has-scroll");
			}
		});

		if (body) {
			resize_ob.observe(body);
		}
	}, []);

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
