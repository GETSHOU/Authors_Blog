import { BASE_SERVER_URL, END_POINT } from '../../services';
import { getCurrentDate } from '../utils';

export const addUser = (login, password) =>
	fetch(`${BASE_SERVER_URL}/${END_POINT.USERS}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			login,
			password,
			role_id: 2,
			registered_at: getCurrentDate(),
		}),
	}).then((createdUser) => createdUser.json());
