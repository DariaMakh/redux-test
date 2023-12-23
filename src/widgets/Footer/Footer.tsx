import { Container } from '@mui/system';
import { IconLogo } from '../../shared/components/Icons';
import s from './styles.module.css';

export const Footer = () => {
	return (
		<div className={s.footer}>
			<Container maxWidth='lg' style={{ padding: 0 }}>
				<IconLogo />
			</Container>
		</div>
	);
};
