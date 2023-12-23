import { Box, TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInFormSchema } from './validator';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSignInMutation } from '../../api/authApi';
import { useAppDispatch } from '../../app/store/hooks';
import { setTokens } from '../../app/store/reducers/auth/auth-slice';
import { setUser } from '../../app/store/reducers/user/user-slice';
import { objectHasProperty } from '../../shared/utils/common';
import { getMessageFromError } from '../../shared/utils/error';

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
			values.email.toLowerCase();
			values.password.toLowerCase();

			console.log(values);
			const response = await signIn(values).unwrap();
			toast.success('Вы успешно вошли в систему');
			dispatch(setUser(response.data));
			dispatch(setTokens({ accessToken: response.token, refreshToken: '' }));

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
	);
};
