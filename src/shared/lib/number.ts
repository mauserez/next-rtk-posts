import { v4 as uuidv4 } from "uuid";

export const randomInt = (from: number, to: number) => {
	const min = Math.ceil(from);
	const max = Math.floor(to);

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const uid = () => {
	return uuidv4();
};
