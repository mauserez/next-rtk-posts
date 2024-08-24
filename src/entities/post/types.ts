export type PostType = {
	userId: string;
	id: number;
	title: string;
	body: string;
};

export type PostUserAddressType = {
	street: string;
	suite: string;
	city: string;
	zipcode: number;
	geo: {
		lat: number;
		lng: number;
	};
};

export type PostUserType = {
	id: number;
	name: string;
	username: string;
	email: string;
	address: PostUserAddressType;
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
};
