import { Container } from '@mui/system';
import s from './ErrorContent.module.css';
import { ReactComponent as Icon } from '../../assets/images/notfound.svg';
import { Typography } from '@mui/material';
import { FC } from 'react';
import OutlinedBtn from '../OutlinedBtn';

type IErrorContentProps = {
	title: string;
	subtitle?: string;
};

const ErrorContent: FC<IErrorContentProps> = ({ title, subtitle }) => {
	return (
		<Container maxWidth='lg' style={{ padding: 0, flexGrow: 1 }}>
			<div className={s.content}>
				<Icon style={{ marginTop: '20px' }} />
				<Typography
					variant='h6'
					component='h3'
					sx={{
						fontWeight: 600,
						maxWidth: '300px',
						textAlign: 'center',
						marginTop: '20px',
					}}>
					{title}
				</Typography>
				{subtitle && <Typography variant='subtitle1'>{subtitle}</Typography>}
				<OutlinedBtn text='На главную' href='/' mt='20px' />
			</div>
		</Container>
	);
};

export default ErrorContent;
