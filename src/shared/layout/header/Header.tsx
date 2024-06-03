"use client";

import { Logo, Button } from "@/shared/ui";
import { Group } from "@mantine/core";
import { useRouter } from "next/navigation";

import clsx from "clsx";
import s from "./Header.module.css";

export const Header = () => {
	const router = useRouter();
	const handleBack = () => {
		router.back();
	};

	return (
		<header className={s.header}>
			<Group justify="space-between">
				<Logo />
				<Button
					onClick={handleBack}
					className={clsx({
						[s.back]: true,
					})}
				>
					Back
				</Button>
			</Group>
		</header>
	);
};
