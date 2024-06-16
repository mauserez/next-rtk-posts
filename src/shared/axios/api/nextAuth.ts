import axios from "axios";
import https from "https";

export const nextAuthApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
});

const httpsAgent = new https.Agent({
	rejectUnauthorized: false,
});

nextAuthApi.defaults.httpsAgent = httpsAgent;
