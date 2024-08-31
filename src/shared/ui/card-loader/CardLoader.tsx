import { ComponentProps } from "react";
import clsx from "clsx";

import s from "shared/ui/card-loader/CardLoader.module.css";

type CardLoaderProps = ComponentProps<"div">;

export function CardLoader(props: CardLoaderProps) {
	const { children, className = "" } = props;
	return <div className={clsx(s.loader, "ldr", className)}>{children}</div>;
}
