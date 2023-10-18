import { setUserRole } from '../api';
import { ROLE } from '../server-constants';
import { sessions } from '../sessions';

export const updateUserRole = async (hash, userId, roleId) => {
	try {
		const accessRoles = [ROLE.ADMIN];

		const access = await sessions.checkAccess(hash, accessRoles);

		if (!access) {
			return {
				error: 'Доступ запрещен',
				response: null,
			};
		}

		await setUserRole(userId, roleId);

		return {
			error: null,
			response: true,
		};
	} catch (error) {
		throw new Error(error);
	}
};
