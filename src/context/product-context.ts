import { createContext } from 'react';

export interface ProductsContextType {
	products: Product[];
	loadingProducts: boolean;
	onAddToCart: (id: string) => void;
	searchValue: string;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

ProductsContext.displayName = 'ProductsContext';
