import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useServerRequest } from '../../hooks';
import { userRoleSelector } from '../../store/selectors';
import { Table } from './components';
import { PrivateContent } from '../../components';
import { checkAccess } from '../../../js/utils';
import { ROLES } from '../../../js/constants';
import styles from './Users.module.css';

export const Users = () => {
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [serverError, setServerError] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	const requestServer = useServerRequest();
	const userRole = useSelector(userRoleSelector);

	const isAdmin = checkAccess([ROLES.ADMIN], userRole);

	useEffect(() => {
		if (!isAdmin) {
			return;
		}

		Promise.all([
			requestServer('fetchUsers'),
			requestServer('fetchRoles'),
		]).then(([ usersResponse, rolesResponse ]) => {
			if (usersResponse.error || rolesResponse.error) {
				setServerError(usersResponse.error || rolesResponse.error);

				return;
			}

			setUsers(usersResponse.response);
			setRoles(rolesResponse.response);
		});
	}, [isAdmin, requestServer, shouldUpdateUserList]);

	return (
		<PrivateContent access={[ROLES.ADMIN]} serverError={serverError}>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>Пользователи</h2>
				<Table users={users} roles={roles} shouldUpdateUserList={shouldUpdateUserList} setShouldUpdateUserList={setShouldUpdateUserList}/>
			</div>
		</PrivateContent>
	)
};
