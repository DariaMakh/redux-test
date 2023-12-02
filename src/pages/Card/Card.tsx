import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { FC, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { getMessageFromError } from '../../utils/error';
import { useGetProductByIDQuery } from '../../api/productsApi';
import { withQuery } from '../../HOCs/withQuery';

const CardPage: FC = () => {
	const { productId } = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	const onClickBackBtn = () => {
		if (location && location.state?.location?.path) {
			navigate(location.state.location.path);
		} else {
			navigate('/');
		}
	};

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
				product: product as Product,
			})}
		</>
	);
};

export default CardPage;
