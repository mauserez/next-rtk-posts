import {
	maskitoWithPlaceholder,
	maskitoEventHandler,
	maskitoPrefixPostprocessorGenerator,
} from "@maskito/kit";
import { MaskitoOptions, maskitoUpdateElement } from "@maskito/core";

export const PLACEHOLDER = "+7(9xx)xxx-xx-xx";
const { removePlaceholder, plugins, ...placeholderOptions } =
	maskitoWithPlaceholder(PLACEHOLDER);

export const phoneMaskitoMask: MaskitoOptions = {
	preprocessors: placeholderOptions.preprocessors,
	postprocessors: [
		maskitoPrefixPostprocessorGenerator("+7(9"),
		...placeholderOptions.postprocessors,
	],
	plugins: [
		...plugins,
		maskitoEventHandler("focus", (element) => {
			const initialValue = element.value || "+7(9";

			maskitoUpdateElement(
				element,
				initialValue + PLACEHOLDER.slice(initialValue.length)
			);
		}),
		maskitoEventHandler("blur", (element) => {
			const cleanValue = removePlaceholder(element.value);
			maskitoUpdateElement(element, cleanValue === "+7(9" ? "" : cleanValue);
		}),
	],
	mask: [
		"+",
		"7",
		"(",
		/\d/,
		/\d/,
		/\d/,
		")",
		/\d/,
		/\d/,
		/\d/,
		"-",
		/\d/,
		/\d/,
		"-",
		/\d/,
		/\d/,
	],
};
