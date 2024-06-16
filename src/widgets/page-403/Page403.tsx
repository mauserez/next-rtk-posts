import { isAuthenticated } from "@/core/nextauth/auth";

import Link from "next/link";
import { Stack } from "@mantine/core";
import { Button } from "@/shared/ui/controls";

import { cn } from "@/shared/utils/cn";
import s from "./Page403.module.css";

export const Page403 = async () => {
	const isAuth = await isAuthenticated();
	const text = isAuth
		? "Обратитесь к администратору"
		: "Сначала авторизуйтесь, если не поможет обратитесь к администратору";

	return (
		<div className={s.card}>
			<Stack gap={24}>
				<div className={cn(s.errorNum)}>403</div>
				<div>
					У вас не хватает прав для просмотра этой страницы. <br />
					{text}
				</div>
				<Button className="hover:!bg-violet-500 self-center">
					<Link href={"/login"}>Войти</Link>
				</Button>
			</Stack>
		</div>
	);

	return "";
};
