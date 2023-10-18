import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

export const Logo = () => {
	return (
		<div className={styles.logoWrapper}>
			<Link to='/' className={styles.link}>
				<div className={styles.logo}>
					<i className="fa fa-code icon--light icon--big" aria-hidden="true"></i>
				</div>
				<h1 className={styles.logoTitle}>
					<span>Блог</span>
					<br />
					<span>веб-разработчика</span>
				</h1>
			</Link>
		</div>
	)
};
