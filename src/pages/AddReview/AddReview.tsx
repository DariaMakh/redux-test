import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIDQuery } from '../../api/productsApi';
import { withProtection } from '../../shared/HOCs/withProtection';
import { withQuery } from '../../shared/HOCs/withQuery';
import { getMessageFromError } from '../../shared/utils/error';
import { ReviewForm } from '../../features/ReviewForm';

export const AddReview: FC = withProtection(() => {
	const { productId } = useParams();
	const ID = useMemo(() => {
		return productId || '';
	}, [productId]);

	const {
		data: product = [],
		isError,
		isLoading,
		error,
		refetch,
	} = useGetProductByIDQuery(ID);

	return (
		<>
			{withQuery(ReviewForm)({
				isError,
				isLoading,
				error: getMessageFromError(error, 'Неизвестная ошибка'),
				refetch,
				product: product as Product,
			})}
		</>
	);
});
