import React, { FC, useState } from 'react';
import { getMessageFromError } from '../../../utils/error';
import PageTittle from '../../Title';
import { OutlinedInput, Stack } from '@mui/material';
import OutlinedBtn from '../../OutlinedBtn';
import { toast } from 'react-toastify';
import { useCreateProductReviewMutation } from '../../../api/productsApi';
import { useNavigate } from 'react-router-dom';

interface IProps {
	product: Product;
}

export const AddReviewForm: FC<IProps> = ({ product }) => {
	const [text, setText] = useState<string>('');
	const [createReview] = useCreateProductReviewMutation();
	const navigate = useNavigate();

	const onSubmit = async () => {
		try {
			await createReview({
				productId: product._id,
				body: {
					text: text,
				},
			});
			navigate(`/catalog/${product._id}`);
		} catch (error) {
			toast.error(
				getMessageFromError(error, 'Неизвестная ошибка при поиске товара')
			);
		}
	};

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
