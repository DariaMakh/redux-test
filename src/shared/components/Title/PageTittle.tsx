import { Typography, TypographyVariant } from '@mui/material';
import { FC } from 'react';

interface IPageTittleProps {
	title: string;
	variant?: TypographyVariant;
}

export const PageTittle: FC<IPageTittleProps> = ({ title, variant = 'h3' }) => {
	return (
		<Typography
			variant={variant}
			component='h1'
			sx={{ fontWeight: 600, marginTop: '20px' }}>
			{title}
		</Typography>
	);
};
