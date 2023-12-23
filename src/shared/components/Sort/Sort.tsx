import ButtonGroup from '@mui/material/ButtonGroup/ButtonGroup';
import s from './Sort.module.css';
import Button from '@mui/material/Button/Button';

export const Sort = () => {
	return (
		<ButtonGroup variant='text' className={s.wrap}>
			<Button
				onClick={() => {
					return null;
				}}>
				Сначала дешёвые
			</Button>
			<Button>Сначала дорогие</Button>
			<Button>По скидке</Button>
		</ButtonGroup>
	);
};
