import { PROP_TYPE } from '../../../js/constants';
import styles from './Container.module.css';

export const Container = ({children}) => (
  <div className={styles.wrapper}>
    {children}
  </div>
);

Container.propTypes = {
	children: PROP_TYPE.CHILDREN,
};
