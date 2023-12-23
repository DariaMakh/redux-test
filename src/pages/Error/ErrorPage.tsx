import { Container, Icon, Typography } from '@mui/material';
import { FC } from 'react';
import OutlinedBtn from '../../shared/components/OutlinedBtn';
import s from './ErrorPage.module.css';

type IErrorContentProps = {
	title: string;
	subtitle?: string;
	link?: string;
	btnText?: string;
};

export const ErrorPage: FC<IErrorContentProps> = ({
	title,
	subtitle,
	link = '/',
	btnText = 'На главную',
}) => {
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
				<OutlinedBtn text={btnText} href={link} mt='20px' />
			</div>
		</Container>
	);
};
