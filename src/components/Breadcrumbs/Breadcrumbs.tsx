import { Breadcrumbs, Link, Typography } from '@mui/material';

const LocalBreadcrumbs = () => {
	const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.preventDefault();
		console.info('You clicked a breadcrumb.');
	};

	return (
		<Breadcrumbs aria-label='breadcrumb' onClick={handleClick}>
			<Link underline='hover' color='inherit' href='/'>
				Главная
			</Link>
			<Typography color='text.primary'>Каталог</Typography>
		</Breadcrumbs>
	);
};

export default LocalBreadcrumbs;
