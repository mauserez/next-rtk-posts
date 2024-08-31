import { TiHeartFullOutline, TiHeartOutline } from "react-icons/ti";
import { IconBaseProps } from "react-icons/lib";
import { MouseEvent } from "react";

import clsx from "clsx";
import s from "shared/ui/buttons/button-like/ButtonLike.module.css";

type ButtonLikeProps = {
	active: boolean;
	onClick?: (e: MouseEvent<HTMLDivElement>) => void;
} & IconBaseProps &
	React.SVGAttributes<SVGElement>;

export const ButtonLike = (props: ButtonLikeProps) => {
	const { active, className = "", onClick, size = 24, ...restProps } = props;
	const cn = clsx(s.icon, className);

	return (
		<div
			className={cn}
			onClick={(e) => {
				e.stopPropagation();
				onClick?.(e);
			}}
		>
			{active ? (
				<TiHeartFullOutline size={size} {...restProps} />
			) : (
				<TiHeartOutline size={size} {...restProps} />
			)}
		</div>
	);
};
