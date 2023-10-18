import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userRoleSelector, userLoginSelector } from '../../../../store/selectors';
import { logout } from '../../../../store/actions';
import { checkAccess } from '../../../../../utils';
import { ROLES } from '../../../../../constants';
import styles from './ControlsLogin.module.css';

export const ControlsLogin = () => {
	const dispatch = useDispatch();
	const roleId = useSelector(userRoleSelector);
	const login = useSelector(userLoginSelector);

	// TODO: Копия функции onLogout()
	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	}

	const isGuest = checkAccess([ROLES.GUEST], roleId);

	return (
		<div className={styles.controls}>
			{isGuest
				? <Link to='/login' className={styles.link}>
						<div className={styles.linkText}>Войти</div>
						<i className="fa fa-sign-in icon icon--light icon--1-6r" aria-hidden="true"></i>
					</Link>
				: <>
						<div className={styles.linkText}>{login}</div>
						<span className={styles.link} onClick={onLogout}>
							<i className="fa fa-sign-out icon icon--light icon--1-6r" aria-hidden="true"></i>
						</span>
					</>
			}
		</div>
	)
};
