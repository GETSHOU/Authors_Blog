import styles from './Avatar.module.css';

export const Avatar = ({className}) => {
	return (
		<div className={`${styles.wrapper} ${styles[className]}`}>
			{/* <img src="" alt="" /> */}
			<div className={styles.plug}></div>
		</div>
	)
};
