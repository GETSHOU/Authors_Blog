import { BASE_SERVER_URL, END_POINT } from '../../services';
import { userTransform } from '../transformers';

export const getUser = async (loginToFind) =>
	fetch(`${BASE_SERVER_URL}/${END_POINT.USERS}?login=${loginToFind}`)
		.then((response) => response.json())
		.then(([loadedUser]) => loadedUser && userTransform(loadedUser));
