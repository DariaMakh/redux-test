import { Stack, CircularProgress } from '@mui/material';

export const Spinner = () => {
	return (
		<Stack sx={{ marginTop: '40px', width: '100%' }}>
			<CircularProgress
				sx={{
					margin: '0 auto',
					width: '80px',
					height: '80px',
					color: '#cecece',
				}}
			/>
		</Stack>
	);
};

