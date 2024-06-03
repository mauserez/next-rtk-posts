"use client";

import { yupResolver } from "mantine-form-yup-resolver";
import * as yup from "yup";
import { useForm } from "@mantine/form";
import { Input, Button } from "@/shared/ui";

export default function LoginPage() {
	const schema = yup.object().shape({
		email: yup.string().required("Email required").email("Invalid email"),
		password: yup
			.string()
			.required("Password required")
			.min(4, "Name should have at least 4 letters"),
	});

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			email: "",
			password: "",
		},
		validate: yupResolver(schema),
	});

	return (
		<form onSubmit={form.onSubmit(console.log)}>
			<Input
				label="Email"
				placeholder="Input email"
				key={form.key("email")}
				{...form.getInputProps("email")}
			/>
			<Input
				mt="sm"
				label="Password"
				placeholder="Input password"
				key={form.key("password")}
				{...form.getInputProps("password")}
			/>

			<Button type="submit" mt="sm">
				Submit
			</Button>
		</form>
	);

	form.validate();
	form.errors;
}
