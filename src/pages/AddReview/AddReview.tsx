import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIDQuery } from '../../api/productsApi';
import { getMessageFromError } from '../../utils/error';
import { withQuery } from '../../HOCs/withQuery';
import { AddReviewForm } from '../../components/forms/AddReviewForm/AddReviewForm';

const AddReview: FC = () => {
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
			{withQuery(AddReviewForm)({
				isError,
				isLoading,
				error: getMessageFromError(error, 'Неизвестная ошибка'),
				refetch,
				product: product as Product,
			})}
		</>
	);
};

export default AddReview;
