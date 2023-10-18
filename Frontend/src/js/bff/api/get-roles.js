import { BASE_SERVER_URL, END_POINT } from '../../services';

export const getRoles = () =>
	fetch(`${BASE_SERVER_URL}/${END_POINT.ROLES}`).then((loadedRoles) =>
		loadedRoles.json(),
	);
