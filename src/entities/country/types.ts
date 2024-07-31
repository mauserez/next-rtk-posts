export type CountryType = {
	id: string;
	country: string;
	lang: string;
};

export type CountryListItemType = {
	value: string;
	label: string;
};

export type CountryListType = CountryListItemType[];

export type LangListItemType = {
	value: string;
	label: string;
};

export type LangListType = LangListItemType[];
