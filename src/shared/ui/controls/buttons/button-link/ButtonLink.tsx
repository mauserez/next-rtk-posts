import { Button, ButtonProps } from "shared/ui/controls/buttons";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";

type ButtonLinkProps = ButtonProps & { href: string };

export const ButtonLink = (props: ButtonLinkProps) => {
	const { href, className, children, ...restProps } = props;

	return (
		<Link href={href}>
			<Button cssVariant="success" className={cn(className)} {...restProps}>
				{children}
			</Button>
		</Link>
	);
};
