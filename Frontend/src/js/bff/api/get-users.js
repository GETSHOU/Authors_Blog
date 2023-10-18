import { BASE_SERVER_URL, END_POINT } from '../../services';
import { userTransform } from '../transformers';

export const getUsers = async () =>
	fetch(`${BASE_SERVER_URL}/${END_POINT.USERS}`)
		.then((loadedUsers) => loadedUsers.json())
		.then((loadedUsers) => loadedUsers && loadedUsers.map(userTransform));
