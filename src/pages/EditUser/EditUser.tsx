import { OutlinedInput, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../storage/hooks';
import { selectUser } from '../../storage/reducers/user/selectors';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import OutlinedBtn from '../../components/OutlinedBtn';
import PageTittle from '../../components/Title';
import { fetchEditedUser } from '../../storage/reducers/user/user-slice';
const EditUser = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const user = useAppSelector(selectUser) as User;
	const [name, setName] = useState<string>(user.name);
	const [about, setAbout] = useState<string>(user.about);

	const onSubmit = () => {
		dispatch(fetchEditedUser({ name, about }));
		navigate('/profile');
	};

	return (
		<Stack sx={{ marginTop: '20px' }}>
			<PageTittle title='Профиль' />
			<Stack sx={{ marginTop: '30px', gap: '16px', width: '70%' }}>
				<>
					<OutlinedInput
						name='user-name'
						value={name}
						placeholder='Имя'
						onChange={(event) => event && setName(event.target.value)}
					/>
				</>

				<>
					<OutlinedInput
						name='user-about'
						value={about}
						placeholder='О себе'
						onChange={(event) => event && setAbout(event.target.value)}
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

export default EditUser;
