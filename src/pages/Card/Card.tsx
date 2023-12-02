import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';
import { useAppDispatch, useAppSelector } from '../../storage/hooks';
import { selectProduct } from '../../storage/reducers/product/selectors';
import { batch } from 'react-redux';
import { setSingleProduct } from '../../storage/reducers/product/product-slice';
import { toast } from 'react-toastify';
import { getMessageFromError } from '../../utils/error';
import { useGetProductByIDMutation } from '../../api/productsApi';

const CardPage = () => {
	const dispatch = useAppDispatch();

	const { product } = useAppSelector(selectProduct);
	const [getProductById, { isLoading }] = useGetProductByIDMutation();

	const { productId } = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	const ID = useMemo(() => {
		return productId || '';
	}, [productId]);

	const onClickBackBtn = () => {
		if (location && location.state?.location?.path) {
			navigate(location.state.location.path);
		} else {
			navigate('/');
		}
	};

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

	if (isLoading) {
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
