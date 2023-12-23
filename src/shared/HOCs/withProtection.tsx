import { ComponentType, FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/store/hooks';
import { accessTokenSelector } from '../../app/store/reducers/auth/selectors';

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
