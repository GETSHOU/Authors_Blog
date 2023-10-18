import { getUser } from '../api';
import { sessions } from '../sessions';

export const authorization = async (authLogin, authPassword) => {
	try {
		const user = await getUser(authLogin);
		const { id, login, password, roleId } = user;

		if (!user) {
			return {
				error: 'Такой пользователь не найден',
				response: null,
			};
		}

		if (authPassword !== password) {
			return {
				error: 'Неверный пароль',
				response: null,
			};
		}

		return {
			error: null,
			response: {
				id,
				login,
				roleId,
				session: sessions.create(user),
			},
		};
	} catch (error) {
		throw new Error(error);
	}
};
