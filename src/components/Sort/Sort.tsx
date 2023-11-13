import { ButtonGroup, Button } from '@mui/material';
import s from './Sort.module.css';

const Sort = () => {
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

export default Sort;
