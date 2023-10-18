import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setUserAction } from '../../store/actions';
import { userRoleSelector } from '../../store/selectors';
import { ROLES } from '../../../js/constants';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Aside, ModalWindow } from '../../components';
import { WithContainer } from '../../_HOC';
import styles from './Main.module.css';
import { checkAccess } from '../../../js/utils';

const HeaderWithContainer = WithContainer(Header);
const FooterWithContainer = WithContainer(Footer);
const MainContentWithContainer = WithContainer(Outlet);

export const Main = () => {
	const dispatch = useDispatch();
	const userRole = useSelector(userRoleSelector);

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		} else {
			const currentUserData = JSON.parse(currentUserDataJSON);

			dispatch(setUserAction({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}));
		}
	}, [dispatch]);

	const isAdmin = checkAccess([ROLES.ADMIN], userRole);

	return (
		<div className={styles.pageWrapper}>
			{isAdmin && <Aside />}
			<div className={isAdmin ? `${styles.mainContentWrapper} ${styles.adminContentWrapper}` : `${styles.mainContentWrapper}`}>
				<div className={styles.mainContent}>
					{(!isAdmin) &&
						<div className={styles.headerWrapper}>
							<HeaderWithContainer />
						</div>
					}
					<main className={styles.contentWrapper}>
						<MainContentWithContainer />
					</main>
				</div>
				<div className={styles.footerWrapper}>
					<FooterWithContainer />
				</div>
			</div>
			<ModalWindow />
		</div>
	);
};
