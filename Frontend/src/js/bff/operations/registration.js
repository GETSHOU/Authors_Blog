import { getUser, addUser } from '../api';
import { sessions } from '../sessions';

export const registration = async (regLogin, regPassword) => {
	try {
		const existedUser = await getUser(regLogin);

		if (existedUser) {
			return {
				error: 'Такой логин уже занят',
				response: null,
			};
		}

		const user = await addUser(regLogin, regPassword);

		return {
			error: null,
			response: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	} catch (error) {
		throw new Error(error);
	}
};