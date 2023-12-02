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
								Refetch
							</Button>
						}
						severity='error'>
						<AlertTitle>Error</AlertTitle>
						{error ?? 'Unknown error. Please resend request'}
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

		// если ошибок нет и мы получили данные, то показываем обернутый компонент
		return <WrappedComponent {...(rest as P)} />;
	};

	ReturnedComponent.displayName = `withQuery${WrappedComponent.displayName}`;
	return ReturnedComponent;
};
