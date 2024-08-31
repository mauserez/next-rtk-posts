"use client";

import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { cn } from "shared/lib/cn";
import s from "shared/ui/buttons/button-back/ButtonBack.module.css";

export function ButtonBack() {
	const router = useRouter();
	const handleBack = () => {
		router.back();
	};

	return (
		<Button onClick={handleBack} className={cn(s.backBtn)}>
			Back
		</Button>
	);
}
