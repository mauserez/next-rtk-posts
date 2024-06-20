"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/shared/ui/controls";
import { Form, useForm } from "react-hook-form";
import { FormInput, FormInputPassword } from "@/shared/ui/form-controls";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import s from "./LoginForm.module.css";
import { cn } from "@/shared/utils/cn";

const validationSchema = yup.object({
	username: yup.string().required("Введите логин").min(4).email(),
	password: yup.string().required("Введите пароль").min(6),
});

export const LoginForm = () => {
	const [loading, setLoading] = useState(false);
	const [errorText, setErrorText] = useState("");
	const [buttonText, setButtonText] = useState("Submit");
	const router = useRouter();

	const { control, formState } = useForm({
		reValidateMode: "onSubmit",
		resolver: yupResolver(validationSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	return (
		<Form
			className={s.loginForm}
			control={control}
			onChange={() => setErrorText("")}
			onSubmit={async ({ data }) => {
				setLoading(true);
				const credentials = {
					username: data.username,
					password: data.password,
				};

				const res = await signIn("credentials", {
					...credentials,
					redirect: false,
				});

				setLoading(false);

				if (!res?.error) {
					setButtonText("Success");
					router.refresh();
				} else {
					setErrorText(res.error);
				}
			}}
			onError={(e) => console.log(e)}
		>
			<FormInput
				label="Логин"
				placeholder="Введите почту"
				name="username"
				control={control}
			/>

			<FormInputPassword
				label="Пароль"
				type="password"
				placeholder="Введите пароль"
				name="password"
				control={control}
			/>

			<div>{errorText}</div>

			<Button
				cssVariant="violet"
				isLoading={loading}
				disabled={!formState.isValid}
				className={cn(s.submitBtn)}
				type="submit"
			>
				{buttonText}
			</Button>
		</Form>
	);
};
