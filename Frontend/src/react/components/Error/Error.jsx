import { PROP_TYPE } from '../../../js/constants';
import styles from './Error.module.css';

export const Error = ({ error }) => {
	return error && (
		<div className={styles.wrapper}>
			<div className={styles.error}>
				<h2 className={styles.title}>Ошибка!</h2>
				<div className={styles.text}>{error}</div>
			</div>
		</div>
	)
};

Error.propTypes = {
	error: PROP_TYPE.ERROR,
};
