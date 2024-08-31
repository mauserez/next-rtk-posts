export function randomHex() {
	let hex = "";
	const hexValues = "0123456789abcdef";

	for (let i = 0; i < 6; i++) {
		hex += hexValues.charAt(Math.floor(Math.random() * hexValues.length));
	}
	return hex;
}

export function randomGradient(degree: number | null = null) {
	const deg = !degree ? Math.floor(Math.random() * 360) : degree;
	const firstColor = randomHex();
	const secondColor = randomHex();

	const gradient = `linear-gradient(${deg}deg,#${firstColor},#${secondColor})`;

	return gradient;
}
