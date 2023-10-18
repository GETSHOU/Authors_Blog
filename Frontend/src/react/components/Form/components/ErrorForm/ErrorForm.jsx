import { PROP_TYPE } from '../../../../../constants';
import styles from './ErrorForm.module.css';

export const ErrorForm = ({serverError}) => {
	return (
		<div className={styles.wrapper}>
			<span className={styles.error}>{serverError}</span>
		</div>
	)
}

ErrorForm.propTypes = {
	serverError: PROP_TYPE.ERROR.isRequired,
};
