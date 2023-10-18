import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions';
import { userLoginSelector } from '../../store/selectors';
import { Avatar } from '../Avatar/Avatar';
import styles from './Aside.module.css';

export const Aside = () => {
	const dispatch = useDispatch();
	const login = useSelector(userLoginSelector);

	// TODO: Копия функции onLogout()
	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	}

	return (
		<aside className={styles.navMenu}>
			<header className={styles.header}>
				<h1 className={styles.logoTitle}>Админка</h1>
			</header>
			<div className={styles.userWrapper}>
				<div className={`${styles.avatarWrapper}`}>
					<Avatar className='wrapper--nav' />
				</div>
				<h2 className={styles.userName}>{login}</h2>
				<div className={styles.controls}>
					<span className={styles.controlLink} onClick={onLogout}>
						<span className={styles.textLink}>Выйти</span>
						<i className='fa fa-sign-out icon--light icon--1-5r' aria-hidden='true'></i>
					</span>
				</div>
			</div>
			<ul className={styles.list}>
				<li className={styles.listItem}>
					<Link to='/' className={styles.link}>
						<i className='fa fa-home icon--light icon--1-5r' aria-hidden='true'></i>
						<span className={styles.textLink}>На главную</span>
					</Link>
				</li>
			</ul>
			<div className={styles.navListWrapper}>
				<div className={styles.navListTitle}>Настройки</div>
				<ul className={styles.list}>
					<li className={styles.listItem}>
						<Link to='users' className={styles.link}>
							<i className='fa fa-users icon--light icon--1-2r' aria-hidden='true'></i>
							<span className={styles.textLink}>Пользователи</span>
						</Link>
					</li>
					<li className={styles.listItem}>
						<Link to='post' className={styles.link}>
							<i className='fa fa-file-text-o icon--light icon--1-2r' aria-hidden='true'></i>
							<span className={styles.textLink}>Новая статья</span>
						</Link>
					</li>
				</ul>
			</div>
		</aside>
	)
};
