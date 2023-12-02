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
		id: string;
		name: string;
		about: string;
		avatar: string;
		isAdmin: boolean;
		email: string;
		group: string;
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

	interface Tokens {
		accessToken: string;
		refreshToken: string;
	}

	interface SignUpFormValues {
		email: string;
		group: string;
		password: string;
	}

	interface SignInFormValues {
		email: string;
		password: string;
	}
	interface SignInFormValues {
		email: string;
		password: string;
	}
}
