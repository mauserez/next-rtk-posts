import { createTheme } from "@mantine/core";

export const theme = createTheme({
	autoContrast: true,
	white: "#ffffff",
	black: "#333333",
	radius: {
		xs: "7px",
		sm: "11px",
		md: "13px",
		lg: "16px",
		xl: "19px",
	},
	cursorType: "pointer",
	defaultRadius: "md",
	focusRing: "auto",
});
