import { ComponentProps } from "react";
import s from "shared/ui/card-loader/CardLoader.module.css";
import clsx from "clsx";

type CardLoaderProps = ComponentProps<"div">;

export const CardLoader = (props: CardLoaderProps) => {
	const { children, className = "" } = props;
	return <div className={clsx(s.loader, "ldr", className)}>{children}</div>;
};
