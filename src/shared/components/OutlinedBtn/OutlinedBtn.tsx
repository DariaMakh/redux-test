import s from './OutlinedBtn.module.css';
import { Button } from '@mui/material';
import { FC } from 'react';

interface IOutlinedBtnProps {
	text: string;
	href: string;
	btnSize?: 'medium' | 'small' | 'large' | undefined;
	mt?: string;
	onClick?: () => void;
}

const OutlinedBtn: FC<IOutlinedBtnProps> = ({
	text,
	href,
	btnSize = 'medium',
	mt,
	onClick,
}) => {
	return (
		<Button
			size={btnSize}
			variant='outlined'
			href={href}
			className={s.btn}
			sx={{ marginTop: mt }}
			onClick={onClick}>
			{text}
		</Button>
	);
};

export default OutlinedBtn;
