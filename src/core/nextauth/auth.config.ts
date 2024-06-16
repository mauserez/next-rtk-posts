import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import {
	getAccessByCredentials,
	type SessionUserType,
} from "@/core/nextauth/token";
import { User } from "next-auth";

declare module "next-auth" {
	interface User extends SessionUserType {}
	interface AdapterUser extends SessionUserType {}
	interface Session {
		user: User;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user: User;
	}
}

export const nextAuthOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: {
					label: "username",
					type: "text",
					placeholder: "input username",
				},
				password: {
					label: "password",
					type: "password",
					placeholder: "input password",
				},
			},
			async authorize(credentials) {
				if (!credentials?.password || !credentials.username) {
					throw new Error("Please provide all credentials");
				}

				const empAuthResponse = await getAccessByCredentials(credentials);

				if (empAuthResponse.errorText) {
					throw new Error(empAuthResponse.errorText);
				}

				return empAuthResponse.data;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			} else {
				/* if (token.user) {
					const now = Math.floor(Date.now() / 1000);

					if (token.user.exp - 300 < now) {
						const res = await refreshAccess(token.user.refresh_token);
						if (res.data) {
							token.user = res.data;
						}
					}
				} */
			}

			return token;
		},
		async session({ token, session }) {
			session.user = token.user;
			return session;
		},
	},
};
