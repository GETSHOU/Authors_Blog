import PropTypes from 'prop-types';
import styles from './SearchField.module.css';

export const SearchField = ({ searchQuery, onSearch }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.fieldWrapper}>
				<input className={styles.field} type="text" placeholder='Поиск...' value={searchQuery} onChange={onSearch}/>
				<div className={styles.iconWrapper}>
					<i className="fa fa-search icon icon--2r" aria-hidden="true"></i>
				</div>
			</div>
		</div>
	)
};

SearchField.propTypes = {
	searchQuery: PropTypes.string.isRequired,
	onSearch: PropTypes.func.isRequired,
};
