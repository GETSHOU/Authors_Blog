import { BASE_SERVER_URL, END_POINT } from '../../services';

export const deleteUser = (userId) =>
	fetch(`${BASE_SERVER_URL}/${END_POINT.USERS}/${userId}`, {
		method: 'DELETE',
	});
