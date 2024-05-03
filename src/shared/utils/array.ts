export const removeBy = <T>(arr: T[], k: keyof T, value: unknown) => {
	const removeIndex = arr.findIndex((item) => item[k] === value);
	arr.splice(removeIndex, 1);

	return arr;
};
