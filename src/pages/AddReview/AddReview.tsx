import { OutlinedInput, Stack } from '@mui/material';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useAppDispatch, useAppSelector } from '../../storage/hooks';
import { selectProduct } from '../../storage/reducers/product/selectors';
import PageTittle from '../../components/Title';
import OutlinedBtn from '../../components/OutlinedBtn';
import {
	useCreateProductReviewMutation,
	useGetProductByIDMutation,
} from '../../api/productsApi';
import { batch } from 'react-redux';
import { toast } from 'react-toastify';
import { getMessageFromError } from '../../utils/error';
import { setSingleProduct } from '../../storage/reducers/product/product-slice';

const AddReview: FC = () => {
	const dispatch = useAppDispatch();
	const { product } = useAppSelector(selectProduct);
	const [text, setText] = useState<string>('');
	const { productId } = useParams();
	const navigate = useNavigate();
	const [getProductById, { isLoading }] = useGetProductByIDMutation();
	const [createReReview] = useCreateProductReviewMutation();

	const ID = useMemo(() => {
		return productId || '';
	}, [productId]);

	const getInitialProduct = async () => {
		try {
			const response = await getProductById({ productId: ID });
			batch(() => {
				dispatch(setSingleProduct(response));
			});
		} catch (error) {
			toast.error(
				getMessageFromError(error, 'Неизвестная ошибка при поиске товара')
			);
		}
	};

	useEffect(() => {
		getInitialProduct();
	}, [dispatch, getProductById, productId]);

	const onSubmit = async () => {
		try {
			await createReReview({
				productId: ID,
				body: {
					text: text,
				},
			});
			navigate(`/catalog/${productId}`);
		} catch (error) {
			toast.error(
				getMessageFromError(error, 'Неизвестная ошибка при поиске товара')
			);
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<Stack sx={{ marginTop: '20px' }}>
			<PageTittle title={`Отзыв о продукте ${product.name}`} />
			<Stack sx={{ marginTop: '30px', gap: '16px' }}>
				<>
					<OutlinedInput
						name='review'
						value={text}
						placeholder='Отзыв о продукте'
						onChange={(event) => event && setText(event.target.value)}
					/>
				</>
			</Stack>

			<OutlinedBtn
				text='Сохранить'
				href='#'
				btnSize='large'
				mt='20px'
				onClick={onSubmit}
			/>
		</Stack>
	);
};

export default AddReview;
