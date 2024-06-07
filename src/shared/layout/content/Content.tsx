import { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import s from "./Content.module.css";

type ContentProps = { children: ReactNode; className?: string };
export const Content = (props: ContentProps) => {
	const { children, className = "" } = props;
	return <main className={cn(s.content, className)}>{children}</main>;
};
