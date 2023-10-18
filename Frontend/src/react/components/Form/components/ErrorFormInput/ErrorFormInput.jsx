import PropTypes from 'prop-types';
import styles from './ErrorFormInput.module.css';

export const ErrorFormInput = ({error}) => {
	return (
		<div className={styles.wrapper}>
			<span className={styles.error}>{error}</span>
		</div>
	)
}

ErrorFormInput.propTypes = {
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
};
