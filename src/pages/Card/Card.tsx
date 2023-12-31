import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { FC, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIDQuery } from '../../api/productsApi';
import { withProtection } from '../../shared/HOCs/withProtection';
import { withQuery } from '../../shared/HOCs/withQuery';
import { getMessageFromError } from '../../shared/utils/error';
import { ProductCard } from '../../entities/ProductCard';

export const CardPage: FC = withProtection(() => {
	const { productId } = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	const onClickBackBtn = () => {
		if (location && location.state?.location?.path) {
			navigate(location.state.location.path);
		} else {
			navigate('/catalog');
		}
	};

	const ID = productId || '';

	const {
		data: product,
		isError,
		isLoading,
		error,
		refetch,
	} = useGetProductByIDQuery(ID);

	const productData = useMemo(() => {
		return product as Product;
	}, [product]);

	return (
		<>
			<IconButton
				sx={{
					textTransform: 'initial',
					color: '#7B8E98',
					fontSize: '14px',
					marginTop: '36px',
				}}
				onClick={onClickBackBtn}>
				<ArrowBackIosIcon sx={{ fontSize: '14px' }} /> Назад
			</IconButton>
			{withQuery(ProductCard)({
				isError,
				isLoading,
				error: getMessageFromError(error, 'Неизвестная ошибка'),
				refetch,
				product: productData,
			})}
		</>
	);
});
