import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';

const CardPage = () => {
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoadingStatus] = useState<boolean>(true);

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

	useEffect(() => {
		if (productId) {
			api
				.getProductById(productId)
				.then((res) => {
					setProduct(res);
					setLoadingStatus(false);
				})
				.catch(() => {
					setLoadingStatus(true);
				});
		}
	}, [productId]);

	if (loading) {
		return <Spinner />;
	}

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
			<ProductCard
				key={productId || ''}
				product={product as Product}
				onAddToCart={() => {
					return null;
				}}
			/>
		</>
	);
};

export default CardPage;
