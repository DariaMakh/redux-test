import { Stack, OutlinedInput } from '@mui/material';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateProductReviewMutation } from '../../api/productsApi';
import OutlinedBtn from '../../shared/components/OutlinedBtn';
import { PageTittle } from '../../shared/components/Title';
import { getMessageFromError } from '../../shared/utils/error';

interface IProps {
	product: Product;
}

export const ReviewForm: FC<IProps> = ({ product }) => {
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
			}).unwrap();
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
