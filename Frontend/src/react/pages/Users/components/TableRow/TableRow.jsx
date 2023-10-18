import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { userRoleSelector } from '../../../../store/selectors';
import { PROP_TYPE, ROLES } from '../../../../../constants';
import { checkAccess, request } from '../../../../../utils';
import styles from './TableRow.module.css';

export const TableRow = ({
	login,
	isHeader,
	registeredAt,
	roleId,
	roles,
	userId,
	shouldUpdateUserList,
	setShouldUpdateUserList,
}) => {
	const [selectedRoleId, setSelectedRoleId] = useState(roleId);
	const [initialRoleId, setInitialRoleId] = useState(roleId);

	const currentRoleId = useSelector(userRoleSelector);

	const roleOnChange = ({target}) => setSelectedRoleId(Number(target.value));

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const onUserRemove = (userId) => {
		if (!isAdmin) {
			return;
		}
		request(`/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	const isAdmin = checkAccess([ROLES.ADMIN], currentRoleId);

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={styles.tableRow}>
			{isHeader
				?
					(
						<div className={styles.tableTitles}>
							<div className={styles.tableCell}>Логин</div>
							<div className={styles.tableCell}>Дата регистрации</div>
							<div className={styles.tableCell}>Роль</div>
							<div className={styles.tableCell}>Действия</div>
						</div>
					)
				:
					(
						<>
							<div className={styles.tableCell}>{login}</div>
							<div className={styles.tableCell}>{registeredAt}</div>
							<div className={styles.tableCell}>
								<select className={styles.select} value={selectedRoleId} onChange={roleOnChange}>
									{roles.map(({ id: userRoleId, name: roleName }) =>
										(
											<option className={styles.option} key={userRoleId} value={userRoleId}>{roleName}</option>
										)
									)}
								</select>
							</div>
							<div className={styles.tableCell}>
								<div className={styles.actionsWrapper}>
									<div className={styles.actions}>
										{/*TODO: Actions нужно вынести в отдельный компонент. Есть повторение в компоненте 'Comment'*/ }
										<button className={styles.actionButton} disabled={isSaveButtonDisabled} onClick={() => onRoleSave(userId, selectedRoleId)}>
											<i className={`fa fa-floppy-o icon icon--save icon--1-5r ${isSaveButtonDisabled ? 'icon--disabled' : undefined}`} aria-hidden='true'></i>
										</button>
										<button className={styles.actionButton} onClick={() => onUserRemove(userId)}>
											<i className='fa fa-trash-o icon icon--trash icon--1-5r' aria-hidden='true'></i>
										</button>
									</div>
								</div>
							</div>
						</>
					)
			}
		</div>
	)
};

TableRow.propTypes = {
	login: PropTypes.string.isRequired,
	isHeader: PropTypes.bool.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	userId: PropTypes.string.isRequired,
	shouldUpdateUserList: PropTypes.bool.isRequired,
	setShouldUpdateUserList: PropTypes.func.isRequired,
};
