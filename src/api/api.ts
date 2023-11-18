import { config } from './config';

type TConfigApi = {
	baseUrl: string;
	headers: HeadersInit;
	groupId: string;
};

export type UserEditBodyDto = Pick<User, 'name' | 'about'>;

export class Api {
	private baseUrl;
	private headers;
	private groupId;

	constructor({ baseUrl, headers, groupId }: TConfigApi) {
		this.baseUrl = baseUrl;
		this.headers = headers;
		this.groupId = groupId;
	}

	private onResponse<T>(res: Response): Promise<T> {
		return res.ok ? res.json() : res.json().then((e) => Promise.reject(e));
	}

	private getApiUrl(path: string) {
		return `${this.baseUrl}${path}`;
	}

	getUserInfo() {
		return fetch(this.getApiUrl('/users/me'), { headers: this.headers }).then(
			this.onResponse<User>
		);
	}

	setUserInfo(userData: UserEditBodyDto) {
		return fetch(this.getApiUrl('/users/me/'), {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify(userData),
		}).then(this.onResponse<User>);
	}

	search(searchQuery: string) {
		return fetch(this.getApiUrl(`/products/search?query=${searchQuery}`), {
			headers: this.headers,
		}).then(this.onResponse<Product[]>);
	}

	changeFavoriteProductStatus(id: string, like: boolean) {
		return fetch(this.getApiUrl(`/products/likes/${id}`), {
			method: like ? 'DELETE' : 'PUT',
			headers: this.headers,
		}).then(this.onResponse<Product>);
	}

	getProductsList() {
		return fetch(this.getApiUrl('/products'), { headers: this.headers }).then(
			this.onResponse<ProductsList>
		);
	}

	getProductById(productID: string) {
		return fetch(this.getApiUrl(`/products/${productID}`), {
			headers: this.headers,
		}).then(this.onResponse<Product>);
	}

	deleteProductById(id: string) {
		return fetch(this.getApiUrl(`/products/${id}`), {
			method: 'DELETE',
			headers: this.headers,
		}).then(this.onResponse<Product>);
	}

	getReviewsById(id: string) {
		return fetch(this.getApiUrl(`/products/review/${id}`), {
			method: 'GET',
			headers: this.headers,
		}).then(this.onResponse<Review[]>);
	}

	postReviewById(id: string, review: Review) {
		return fetch(this.getApiUrl(`/products/review/${id}`), {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(review),
		}).then(this.onResponse<Product[]>);
	}
}

const api = new Api({
	baseUrl: 'https://api.react-learning.ru',
	headers: {
		authorization: `Bearer ${config.token}`,
		'Content-Type': 'application/json',
	},
	groupId: config.data.group,
});

export default api;
