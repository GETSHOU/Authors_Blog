import { BASE_SERVER_URL, END_POINT } from '../../services';
import { sessionTransform } from '../transformers';

export const getSession = async (hash) => {
	return fetch(`${BASE_SERVER_URL}/${END_POINT.SESSIONS}?hash=${hash}`)
		.then((loadedSession) => {
			return loadedSession.json();
		})
		.then(([loadedSession]) => {
			return loadedSession && sessionTransform(loadedSession);
		});
};
