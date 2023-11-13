import s from './OutlinedBtn.module.css';
import { Button } from '@mui/material';
import { FC } from 'react';

interface IOutlinedBtnProps {
	text: string;
	href: string;
	btnSize?: 'medium' | 'small' | 'large' | undefined;
	mt?: string;
}

const OutlinedBtn: FC<IOutlinedBtnProps> = ({
	text,
	href,
	btnSize = 'medium',
	mt,
}) => {
	return (
		<Button
			size={btnSize}
			variant='outlined'
			href={href}
			className={s.btn}
			sx={{ marginTop: mt }}>
			{text}
		</Button>
	);
};

export default OutlinedBtn;
