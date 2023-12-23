import { FC } from 'react';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

type IProductReviewProps = {
	review: Review;
	key: number;
};

export const ProductReview: FC<IProductReviewProps> = ({ review, key }) => {
	return (
		<Stack
			direction='column'
			gap='8px'
			key={key}
			borderBottom='1px solid #ECEFF1'
			paddingBottom='16px'>
			<Typography variant='body1'>{review.author?.name}</Typography>
			<Typography variant='body1' fontWeight='600'>
				{review.text}
			</Typography>
		</Stack>
	);
};
