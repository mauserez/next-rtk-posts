import { v4 as uuidv4 } from "uuid";

export function randomInt(from: number, to: number) {
	const min = Math.ceil(from);
	const max = Math.floor(to);

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function uid() {
	return uuidv4();
}
