module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:react/jsx-runtime",
		"prettier",
	],
	ignorePatterns: [
		"dist",
		".eslintrc.cjs",
		"vite.config.ts",
		"tailwind.config.js",
	],
	parser: "@typescript-eslint/parser",
	plugins: [
		"react-refresh",
		"@typescript-eslint",
		"react",
		"@getify/proper-arrows",
		"unicorn",
		"no-relative-import-paths",
		"github",
	],
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		curly: ["error", "all"],
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
		"@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true }],
		"@getify/proper-arrows/where": [
			"error",
			{
				global: false,
				"global-declaration": false,
				property: false,
				export: true,
				trivial: true,
			},
		],
		"unicorn/no-array-for-each": "error",
		"react-refresh/only-export-components": "off",
		"react/jsx-curly-brace-presence": [
			"warn",
			{ props: "never", children: "ignore" },
		],
		"no-implicit-coercion": ["error", { allow: ["!!"] }],
		"no-relative-import-paths/no-relative-import-paths": [
			"error",
			{
				// "allowSameFolder": true, разрешить относительный импорт в одной папке
				rootDir: "src",
			},
		],
		"@typescript-eslint/no-floating-promises": "error",
		"github/no-then": "error",
	},
	parserOptions: { project: ["./tsconfig.json"] },
};
