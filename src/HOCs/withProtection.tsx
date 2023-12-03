import { ComponentType, FC } from 'react';
import { useAppSelector } from '../storage/hooks';
import { accessTokenSelector } from '../storage/reducers/auth/selectors';
import { Navigate, useLocation } from 'react-router-dom';

export const withProtection = <T extends object>(
	WrappedComponent: ComponentType<T>
) => {
	const ReturnedComponent: FC<T> = (props) => {
		const accessToken = useAppSelector(accessTokenSelector);
		const location = useLocation();

		if (!accessToken) {
			return (
				<Navigate
					to='/sign-in'
					state={{
						from: location.pathname,
					}}
				/>
			);
		}
		return <WrappedComponent {...props} />;
	};

	ReturnedComponent.displayName = `withProtection${WrappedComponent.displayName}`;
	return ReturnedComponent;
};
