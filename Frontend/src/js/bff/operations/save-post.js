import { updatePost, addPost } from '../api';
import { ROLE } from '../server-constants';
import { sessions } from '../sessions';

export const savePost = async (hash, newPostData) => {
	try {
		const accessRoles = [ROLE.ADMIN];

		const access = await sessions.checkAccess(hash, accessRoles);

		if (!access) {
			return {
				error: 'Доступ запрещен',
				response: null,
			};
		}

		const savedPost =
			newPostData.id === ''
				? await addPost(newPostData)
				: await updatePost(newPostData);

		return {
			error: null,
			response: savedPost,
		};
	} catch (error) {
		throw new Error(error);
	}
};
