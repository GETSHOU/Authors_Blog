import { deleteUser } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../server-constants';

export const removeUser = async (hash, userId) => {
	try {
		const accessRoles = [ROLE.ADMIN];

		const access = await sessions.checkAccess(hash, accessRoles);

		if (!access) {
			return {
				error: 'Доступ запрещен',
				response: null,
			};
		}

		await deleteUser(userId);

		return {
			error: null,
			response: true,
		};
	} catch (error) {
		throw new Error(error);
	}
};
