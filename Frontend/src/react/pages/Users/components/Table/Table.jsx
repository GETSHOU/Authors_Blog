import PropTypes from 'prop-types';
import { PROP_TYPE, ROLES } from '../../../../../constants';
import { TableRow } from '../TableRow/TableRow';
import styles from './Table.module.css';

export const Table = ({users, roles, shouldUpdateUserList, setShouldUpdateUserList}) => {
	return (
		<div className={styles.tableWrapper}>
			<div className={styles.table}>
				<TableRow isHeader={true} userInfo={''}/>
				{users.map(({ id, login, roleId, registeredAt }) => {
					return (
						<TableRow
							key={id}
							login={login}
							roles={roles.filter(({id: roleId}) => roleId !== ROLES.GUEST)}
							userId={id}
							roleId={roleId}
							registeredAt={registeredAt}
							shouldUpdateUserList={shouldUpdateUserList}
							setShouldUpdateUserList={setShouldUpdateUserList}
							isHeader={false}
						/>
					)
				})}
			</div>
		</div>
	)
};

Table.propTypes = {
	users: PropTypes.arrayOf(PROP_TYPE.USER).isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	shouldUpdateUserList: PropTypes.bool.isRequired,
	setShouldUpdateUserList: PropTypes.func.isRequired,
};
