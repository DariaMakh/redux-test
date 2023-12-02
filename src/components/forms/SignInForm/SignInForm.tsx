import { Avatar, Box, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInFormSchema } from './helpers/validator';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../../api/authApi';
import { toast } from 'react-toastify';
import { getMessageFromError } from '../../../utils/error';
import { useAppDispatch } from '../../../storage/hooks';
import { batch } from 'react-redux';
import { setUser } from '../../../storage/reducers/user/user-slice';
import { setTokens } from '../../../storage/reducers/auth/auth-slice';
import { objectHasProperty } from '../../../utils/common';

export const SignInForm: FC = () => {
	const navigate = useNavigate();
	const [signIn] = useSignInMutation();
	const dispatch = useAppDispatch();
	const { state } = useLocation();

	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignInFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(signInFormSchema),
	});

	const submitHandler: SubmitHandler<SignInFormValues> = async (values) => {
		try {
			const response = await signIn(values).unwrap();
			toast.success('Вы успешно вошли в систему');
			batch(() => {
				dispatch(setUser(response.data));
				dispatch(setTokens({ accessToken: response.token, refreshToken: '' }));
			});
			navigate(
				objectHasProperty(state, 'from') && typeof state.from === 'string'
					? state.from
					: '/'
			);
		} catch (error) {
			toast.error(
				getMessageFromError(
					error,
					'Неизвестная ошибка при авторизации пользователя'
				)
			);
		}
	};

	return (
		<Box
			sx={{
				marginTop: 8,
			}}>
			<Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component='h1' variant='h5'>
				Войти
			</Typography>
			<Typography variant='h6' sx={{ margin: '10px 0' }}>
				Нету аккаунта? <Link to='/sign-up'>Зарегистрироваться</Link>
			</Typography>
			<Box
				component='form'
				onSubmit={handleSubmit(submitHandler)}
				noValidate
				sx={{ mt: 1 }}>
				<Controller
					name='email'
					control={control}
					render={({ field }) => (
						<TextField
							margin='normal'
							label='Email Address'
							type='email'
							fullWidth
							required
							autoComplete='email'
							error={!!errors.email?.message}
							helperText={errors.email?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					name='password'
					control={control}
					render={({ field }) => (
						<TextField
							label='Password'
							type='password'
							error={!!errors.password?.message}
							helperText={errors.password?.message}
							margin='normal'
							fullWidth
							required
							{...field}
						/>
					)}
				/>

				<LoadingButton
					type='submit'
					disabled={isSubmitted && (!isValid || isSubmitting)}
					loading={isSubmitting}
					variant='contained'
					sx={{ mt: 3, mb: 2 }}>
					войти
				</LoadingButton>
			</Box>
		</Box>
	);
};
