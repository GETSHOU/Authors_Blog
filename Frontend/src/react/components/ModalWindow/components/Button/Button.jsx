import PropTypes from 'prop-types';

export const Button = ({className, text, handler}) => {
	return (
		<button className={className} onClick={handler}>{text}</button>
	)
}

Button.propTypes = {
	className: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	handler: PropTypes.func.isRequired,
};
