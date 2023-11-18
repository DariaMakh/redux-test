import { OutlinedInput, Stack } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useAppDispatch, useAppSelector } from '../../storage/hooks';
import { selectProduct } from '../../storage/reducers/product/selectors';
import {
	fetchCreateReview,
	fetchProduct,
} from '../../storage/reducers/product/product-slice';
import PageTittle from '../../components/Title';
import OutlinedBtn from '../../components/OutlinedBtn';

const AddReview = () => {
	const dispatch = useAppDispatch();
	const { loading, product } = useAppSelector(selectProduct);
	const [text, setText] = useState<string>('');
	const { productId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (productId) {
			dispatch(fetchProduct(productId));
		}
	}, [dispatch, productId]);

	const singleProduct = useMemo(() => {
		return product as Product;
	}, [product]);

	const onSubmit = () => {
		if (productId) {
			dispatch(
				fetchCreateReview({
					productId,
					data: {
						text: text,
					},
				})
			);
			navigate(`/catalog/${productId}`);
		}
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<Stack sx={{ marginTop: '20px' }}>
			<PageTittle title={`Отзыв о продукте ${singleProduct.name}`} />
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
