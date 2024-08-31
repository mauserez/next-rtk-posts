export const unMaskPhone = (maskedPhone: string) => {
	return maskedPhone.replace(/\D+/g, "");
};
