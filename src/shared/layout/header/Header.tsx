"use client";
import { Logo } from "@/shared/ui";
import { Button } from "@/shared/ui/controls";
import { Group } from "@mantine/core";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/utils/cn";
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
				<Button onClick={handleBack} className={cn(s.back)}>
					Back
				</Button>
			</Group>
		</header>
	);
};
