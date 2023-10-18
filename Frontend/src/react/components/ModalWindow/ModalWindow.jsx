import { useSelector } from 'react-redux';
import { modalButtonsSelector, modalIsOpenSelector, modalTitleSelector } from '../../store/selectors';

import { Button } from './components';

import styles from './ModalWindow.module.css';

export const ModalWindow = () => {
	const title = useSelector(modalTitleSelector);
	const isOpen = useSelector(modalIsOpenSelector);
	const buttons = useSelector(modalButtonsSelector);

	return (
		<div className={!isOpen ? styles.modal : `${styles.modal} ${styles.active}`}>
			<div className={styles.content}>
				<h3 className={styles.title}>{title}</h3>
				<div className={styles.buttonsWrapper}>
					{buttons.map(({text, handler}) => (
						<Button
							key={text}
							className={styles.button}
							text={text}
							handler={handler}
						/>
					))}
				</div>
			</div>
		</div>
	)
};
