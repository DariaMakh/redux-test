import {
	Alert,
	AlertTitle,
	Box,
	Button,
	CircularProgress,
	Container,
} from '@mui/material';
import { ComponentType, FC } from 'react';

interface WithQueryProps {
	isLoading: boolean;
	isError: boolean;
	refetch: () => void;
	error?: string;
}

export const withQuery = <P extends object>(
	WrappedComponent: ComponentType<P>
) => {
	const ReturnedComponent: FC<WithQueryProps & P> = (props) => {
		const { isError, isLoading, refetch, error, ...rest } = props;

		if (isError) {
			return (
				<Container maxWidth='sm'>
					<Alert
						action={
							<Button onClick={refetch} color='inherit' size='small'>
								Попробовать еще раз
							</Button>
						}
						severity='error'>
						<AlertTitle>Error</AlertTitle>
						{error ?? 'Неизвестная ошибка. Пожалуйста, попробуйте еще раз'}
					</Alert>
				</Container>
			);
		}

		if (isLoading) {
			return (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			);
		}

		return <WrappedComponent {...(rest as P)} />;
	};

	ReturnedComponent.displayName = `withQuery${WrappedComponent.displayName}`;
	return ReturnedComponent;
};
