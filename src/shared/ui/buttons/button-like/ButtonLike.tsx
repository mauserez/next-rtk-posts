import { TiHeartFullOutline, TiHeartOutline } from "react-icons/ti";
import { IconBaseProps } from "react-icons/lib";

import clsx from "clsx";
import s from "./ButtonLike.module.css";

type ButtonLikeProps = {
	active: boolean;
	onClick?: () => void;
} & IconBaseProps &
	React.SVGAttributes<SVGElement>;

export const ButtonLike = (props: ButtonLikeProps) => {
	const { active, className = "", onClick, size = 24, ...otherProps } = props;
	const cn = clsx(s.icon, className);

	return (
		<div
			className={cn}
			onClick={(e) => {
				e.stopPropagation();
				if (onClick) {
					onClick();
				}
			}}
		>
			{active ? (
				<TiHeartFullOutline size={size} {...otherProps} />
			) : (
				<TiHeartOutline size={size} {...otherProps} />
			)}
		</div>
	);
};
