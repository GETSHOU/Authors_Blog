import { BASE_SERVER_URL, END_POINT } from '../../services';

export const deleteSession = async (sessionId) => {
	fetch(`${BASE_SERVER_URL}/${END_POINT.SESSIONS}/${sessionId}`, {
		method: 'DELETE',
	});
};
