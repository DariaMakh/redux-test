import { Typography } from '@mui/material';
import { FC } from 'react';

interface IPageTittleProps {
	title: string;
	variant?:
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'subtitle1'
		| 'subtitle2'
		| 'body1'
		| 'body2'
		| 'caption'
		| 'button'
		| 'overline';
}

const PageTittle: FC<IPageTittleProps> = ({ title, variant = 'h3' }) => {
	return (
		<Typography
			variant={variant}
			component='h1'
			sx={{ fontWeight: 600, marginTop: '20px' }}>
			{title}
		</Typography>
	);
};

export default PageTittle;
