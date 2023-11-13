import { Container } from '@mui/system';
import Logo from '../Logo';
import s from './Footer.module.css';

const Footer = () => {
	return (
		<div className={s.footer}>
			<Container maxWidth='lg' style={{ padding: 0 }}>
				<Logo />
			</Container>
		</div>
	);
};

export default Footer;
