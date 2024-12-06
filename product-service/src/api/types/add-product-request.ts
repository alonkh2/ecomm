export type AddProductRequet = {
	name: string;
	price: number;
	items: {
		size: number;
		stockAmount: number;
	}[];
};
