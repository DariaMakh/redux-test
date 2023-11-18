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
		reviews: Review[];
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

	type ProductLikeParam = {
		_id: string;
		likes: string[];
	};

	interface Review {
		_id: string;
		text: string;
		author?: User;
		product?: Product;
		updated_at?: string;
		created_at?: string;
	}
}
