export type BE_SingUpResponse = Omit<User, 'id'> & {
	_id: User['id'];
};

export interface BE_SignInResponse {
	data: Omit<User, 'id'> & {
		_id: User['id'];
	};
	token: Tokens['accessToken'];
}

export interface BE_UserResponse {
	data: Omit<User, 'id'> & {
		_id: User['id'];
	};
}

export type UserResponse = {
	data: User;
};

export type SignInResponse = {
	data: User;
	token: Tokens['accessToken'];
};
