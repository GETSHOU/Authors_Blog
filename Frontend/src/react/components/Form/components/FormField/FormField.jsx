import { forwardRef } from 'react';
import { PROP_TYPE } from '../../../../../js/constants';
import { ErrorFormInput } from '../ErrorFormInput/ErrorFormInput';
import styles from './FormField.module.css';


export const FormField = forwardRef(({error, ...props}, ref) => {
	return (
		<div className={styles.wrapper}>
			<label htmlFor={props.name} className={styles.label}>{props.labelname}</label>
			<input className={styles.input} ref={ref} id={props.name} {...props} />
			{error
				? <ErrorFormInput error={error} />
				: null
			}
		</div>
	)
});

FormField.propTypes = {
	error: PROP_TYPE.ERROR,
};
