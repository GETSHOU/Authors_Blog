import { getUsers } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../server-constants';

export const fetchUsers = async (hash) => {
	try {
		const accessRoles = [ROLE.ADMIN];

		const access = await sessions.checkAccess(hash, accessRoles);

		if (!access) {
			return {
				error: 'Доступ запрещен',
				response: null,
			};
		}

		const users = await getUsers();

		return {
			error: null,
			response: users,
		};
	} catch (error) {
		throw new Error(error);
	}
};
