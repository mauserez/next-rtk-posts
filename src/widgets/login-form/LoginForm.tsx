"use client";

import { ComponentProps, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Form, useForm } from "react-hook-form";

import { Button } from "@/shared/ui/controls/buttons";
import {
	FormInput,
	FormInputPassword,
	FormMultiSelect,
	FormCheckbox,
} from "@/shared/ui/form-controls";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import s from "./LoginForm.module.css";
import { cn } from "@/shared/utils/cn";

const validationSchema = yup.object({
	username: yup.string().required("Введите логин").min(4).email(),
	password: yup.string().required("Введите пароль").min(6),
	test: yup.array(),
	accepted: yup.boolean(),
});

type LoginFormProps = ComponentProps<"form">;
export const LoginForm = (props: LoginFormProps) => {
	const { className } = props;
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
			test: [],
			accepted: false,
		},
	});

	return (
		<Form
			className={cn(s.loginForm, className)}
			control={control}
			onChange={() => setErrorText("")}
			onSubmit={async ({ data }) => {
				console.log(data);

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
			<FormMultiSelect
				control={control}
				data={[
					{ value: "1", label: "React" },
					{ value: "2", label: "Vue" },
				]}
				name="test"
				label="Мультиселект"
			/>

			<FormCheckbox
				className="justify-center"
				label="Согласен со всем"
				name="accepted"
				control={control}
			/>

			<div>{errorText}</div>

			<Button
				cssVariant="violet"
				isLoading={loading}
				disabled={!formState.isValid}
				type="submit"
			>
				{buttonText}
			</Button>
		</Form>
	);
};
