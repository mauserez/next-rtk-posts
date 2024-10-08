export function removeFromArrayByKeyValue<T>(
	arr: T[],
	k: keyof T,
	value: unknown
) {
	const removeIndex = arr.findIndex((item) => item[k] === value);
	arr.splice(removeIndex, 1);

	return arr;
}

export function chunk<T>(arr: T[], size: number) {
	const result = [];
	while (arr.length) {
		result.push(arr.splice(0, size));
	}

	return result;
}
