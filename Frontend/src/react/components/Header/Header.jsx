import { Logo } from './components';
import { ControlsLogin } from './components';

import styles from './Header.module.css';

export const Header = () => {
	return (
		<header className={styles.mainHeader}>
			<Logo />
			<ControlsLogin />
		</header>
	)
};
