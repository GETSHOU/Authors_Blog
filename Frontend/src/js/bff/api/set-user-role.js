import { BASE_SERVER_URL, END_POINT } from '../../services';

export const setUserRole = (userId, roleId) =>
	fetch(`${BASE_SERVER_URL}/${END_POINT.USERS}/${userId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			role_id: roleId,
		}),
	});
