import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userRoleSelector, userLoginSelector, userSessionSelector } from '../../../../store/selectors';
import { logoutAction } from '../../../../store/actions';
import { checkAccess } from '../../../../../js/utils';
import { ROLES } from '../../../../../js/constants';
import styles from './ControlsLogin.module.css';

export const ControlsLogin = () => {
	const dispatch = useDispatch();
	const userRole = useSelector(userRoleSelector);
	const login = useSelector(userLoginSelector);
	const session = useSelector(userSessionSelector);

	const isGuest = checkAccess([ROLES.GUEST], userRole);

	return (
		<div className={styles.controls}>
			{isGuest
				? <Link to='/authorization' className={styles.link}>
						<div className={styles.linkText}>Войти</div>
						<i className="fa fa-sign-in icon icon--light icon--1-6r" aria-hidden="true"></i>
					</Link>
				: <>
						<div className={styles.linkText}>{login}</div>
						<Link to='/' className={styles.link} onClick={() => dispatch(logoutAction(session))}>
							<i className="fa fa-sign-out icon icon--light icon--1-6r" aria-hidden="true"></i>
						</Link>
					</>
			}
		</div>
	)
};
