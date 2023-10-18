import PropTypes from 'prop-types';
import styles from './FormButton.module.css';

export const FormButton = ({type, text, ...props}) => {
	return (
		<button type={type} className={styles.button} {...props}>{text}</button>
	)
};

FormButton.propTypes = {
	type: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
};
