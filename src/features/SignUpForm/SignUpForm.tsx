import { Box, TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpFormSchema } from './validator';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSignUpMutation } from '../../api/authApi';
import { getMessageFromError } from '../../shared/utils/error';

export const SignUpForm: FC = () => {
	const navigate = useNavigate();
	const [signUp] = useSignUpMutation();

	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignUpFormValues>({
		defaultValues: {
			email: '',
			group: '',
			password: '',
		},
		resolver: yupResolver(signUpFormSchema),
	});

	const submitHandler: SubmitHandler<SignUpFormValues> = async (values) => {
		try {
			values.email.toLowerCase();
			values.password.toLowerCase();

			await signUp(values).unwrap();
			toast.success('Вы успешно зарегистрированы! Войдите в систему');
			navigate('/sign-in');
		} catch (error) {
			toast.error(
				getMessageFromError(
					error,
					'Неизвестная ошибка при регистрации пользователя'
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
				name='group'
				control={control}
				render={({ field }) => (
					<TextField
						label='Group Id'
						type='text'
						margin='normal'
						error={!!errors.group?.message}
						helperText={errors.group?.message}
						fullWidth
						required
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
				Зарегистрироваться
			</LoadingButton>
		</Box>
	);
};
