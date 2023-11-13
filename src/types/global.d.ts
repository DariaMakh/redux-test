export {};

declare global {
	interface ProductsList {
		products: Product[];
	}
	interface Product {
		available: boolean;
		description: string;
		discount: number;
		isPublished: boolean;
		likes: string[];
		name: string;
		pictures: string;
		price: number;
		stock: number;
		_id: string;
		wight: string;
		author: User;
	}
	interface User {
		_id: string;
		name: string;
		about: string;
		avatar: string;
		email: string;
		__v?: number;
		group?: string;
	}
}
