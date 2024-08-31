export function unMaskPhone(maskedPhone: string) {
	return maskedPhone.replace(/\D+/g, "");
}
