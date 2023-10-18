import { BASE_SERVER_URL, END_POINT } from '../../services';

export const addSession = (hash, user) => {
	fetch(`${BASE_SERVER_URL}/${END_POINT.SESSIONS}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			hash,
			user,
		}),
	});
};
