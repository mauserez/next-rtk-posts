import { LoginForm } from "@/widgets/login-form/LoginForm";
import { cn } from "@/shared/lib/cn";

export default function LoginPage() {
	return (
		<div className={cn("w-screen h-screen flex items-center justify-center")}>
			<LoginForm />
		</div>
	);
}
