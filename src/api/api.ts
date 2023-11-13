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
	//todo

	// getAllInfo() {
	// 	return Promise.all([this.getProductsList(), this.getUserInfo()]);
	// }

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
