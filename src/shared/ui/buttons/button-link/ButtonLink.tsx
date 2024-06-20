import { Button } from "../../controls";
import Link from "next/link";
import { ButtonProps } from "../../controls";
import { cn } from "@/shared/utils/cn";

type ButtonLinkProps = ButtonProps & { href: string };

export const ButtonLink = (props: ButtonLinkProps) => {
	const { href, className, children, ...restProps } = props;

	return (
		<Link href={href}>
			<Button className={cn(className)} {...restProps}>
				{children}
			</Button>
		</Link>
	);
};
