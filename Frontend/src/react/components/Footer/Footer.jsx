import styles from './Footer.module.css';

export const Footer = () => {
	return (
		<footer className={styles.mainFooter}>
			<address className={styles.authorInfo}>
				<h2 className={styles.title}>Блог веб-разработчика</h2>
				<a href="mailto:BorisovSF.mailbox@mail.ru" className={styles.link}>
					BorisovSF.mailbox@mail.ru
				</a>
			</address>
		</footer>
	)
};
