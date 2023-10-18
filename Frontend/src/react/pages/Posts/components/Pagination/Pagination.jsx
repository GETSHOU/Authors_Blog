import PropTypes from 'prop-types';
import styles from './Pagination.module.css';

export const Pagination = ({ page, setPage, lastPage }) => {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.list}>
					<button className={`${styles.item}`} disabled={page === 1} onClick={() => setPage(1)}>
						<i className="fa fa-chevron-left icon icon--light icon--1-2r" aria-hidden="true"></i>
						<i className="fa fa-chevron-left icon icon--light icon--1-2r" aria-hidden="true"></i>
					</button>
					<button className={`${styles.item}`} disabled={page === 1} onClick={() => setPage(page - 1)}>
						<i className="fa fa-chevron-left icon icon--light icon--1-2r" aria-hidden="true"></i>
					</button>
					<div className={`${styles.item} ${styles.currentItem}`} onClick={() => setPage(1)}>{page}</div>
					<button className={`${styles.item}`} disabled={page === lastPage} onClick={() => setPage(page + 1)}>
						<i className="fa fa-chevron-right icon icon--light icon--1-2r" aria-hidden="true"></i>
					</button>
					<button className={`${styles.item}`} disabled={page === lastPage} onClick={() => setPage(lastPage)}>
						<i className="fa fa-chevron-right icon icon--light icon--1-2r" aria-hidden="true"></i>
						<i className="fa fa-chevron-right icon icon--light icon--1-2r" aria-hidden="true"></i>
					</button>
				</div>
			</div>
		</div>
	)
};

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
	lastPage: PropTypes.number.isRequired,
};
