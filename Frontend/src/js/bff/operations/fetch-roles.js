import { getRoles } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../server-constants';

export const fetchRoles = async (hash) => {
	try {
		const accessRoles = [ROLE.ADMIN];

		const access = await sessions.checkAccess(hash, accessRoles);

		if (!access) {
			return {
				error: 'Доступ запрещен',
				response: null,
			};
		}

		const roles = await getRoles();

		return {
			error: null,
			response: roles,
		};
	} catch (error) {
		throw new Error(error);
	}
};
