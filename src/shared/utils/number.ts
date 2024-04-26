export const randomInt = (from: number, to: number) => {
	let min = Math.ceil(from);
	let max = Math.floor(to);

	return Math.floor(Math.random() * (max - min + 1)) + min;
};
