import { ReactNode } from "react";
import { cn } from "shared/lib/cn";
import s from "shared/layout/content/Content.module.css";

type ContentProps = { children: ReactNode; className?: string };
export function Content(props: ContentProps) {
	const { children, className = "" } = props;
	return <main className={cn(s.content, className)}>{children}</main>;
}
