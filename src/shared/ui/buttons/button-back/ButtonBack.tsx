"use client";

import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { cn } from "@/shared/utils/cn";
import s from "./ButtonBack.module.css";

export const ButtonBack = () => {
	const router = useRouter();
	const handleBack = () => {
		router.back();
	};

	return (
		<Button onClick={handleBack} className={cn(s.backBtn)}>
			Back
		</Button>
	);
};
