"use client";
import { Group } from "@mantine/core";
import { Logo } from "shared/ui";
import { useEffect } from "react";

import { cn } from "shared/lib/cn";
import s from "shared/layout/header/Header.module.css";

export function Header() {
	useEffect(() => {
		const body = document.querySelector("body");

		const resize_ob = new ResizeObserver(function () {
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
		<header className={cn(s.header)}>
			<Group justify="space-between">
				<Logo />
			</Group>
		</header>
	);
}
