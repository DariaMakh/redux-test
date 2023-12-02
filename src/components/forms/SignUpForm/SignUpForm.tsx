import { Avatar, Box, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpFormSchema } from './helpers/validator';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../../api/authApi';
import { toast } from 'react-toastify';
import { getMessageFromError } from '../../../utils/error';

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
			sx={{
				marginTop: 8,
			}}>
			<Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component='h1' variant='h5'>
				Регистрация
			</Typography>
			<Typography variant='h6' sx={{ margin: '10px 0' }}>
				Уже есть аккаунт? <Link to='/sign-in'>Войти</Link>
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
		</Box>
	);
};
