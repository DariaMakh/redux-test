import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';
import { useAppDispatch, useAppSelector } from '../../storage/hooks';
import { selectProduct } from '../../storage/reducers/product/selectors';
import { fetchProduct } from '../../storage/reducers/product/product-slice';

const CardPage = () => {
	const dispatch = useAppDispatch();

	const { loading, product } = useAppSelector(selectProduct);

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
		if (!!productId) {
			dispatch(fetchProduct(productId));
		}
	}, [dispatch, productId]);

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
			<ProductCard key={productId || ''} product={product as Product} />
		</>
	);
};

export default CardPage;
