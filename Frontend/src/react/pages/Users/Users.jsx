import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userRoleSelector } from '../../store/selectors';
import { checkAccess, request } from '../../../utils';
import { ROLES } from '../../../constants';
import { Table } from './components';
import { PrivateContent } from '../../components';
import styles from './Users.module.css';

export const Users = () => {
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [serverError, setServerError] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	const roleId = useSelector(userRoleSelector);

	const isAdmin = checkAccess([ROLES.ADMIN], roleId);

	useEffect(() => {
		if (!isAdmin) {
			return;
		}

		Promise
			.all([ request('/users'), request('/users/roles') ])
			.then(([ usersResponse, rolesResponse ]) => {
				if (usersResponse.error || rolesResponse.error) {
					setServerError(usersResponse.error || rolesResponse.error);

					return;
				}

				setUsers(usersResponse.data);
				setRoles(rolesResponse.data);
			});
	}, [isAdmin, shouldUpdateUserList]);

	return (
		<PrivateContent access={[ROLES.ADMIN]} serverError={serverError}>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>Пользователи</h2>
				<Table users={users} roles={roles} shouldUpdateUserList={shouldUpdateUserList} setShouldUpdateUserList={setShouldUpdateUserList}/>
			</div>
		</PrivateContent>
	)
};
