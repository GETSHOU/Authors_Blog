import { addComment, getPost } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../server-constants';
import { getPostCommentsWithAuthor } from '../utils';

export const addPostComment = async (hash, userId, postId, content) => {
	try {
		const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

		const access = await sessions.checkAccess(hash, accessRoles);

		if (!access) {
			return {
				error: 'Доступ запрещен',
				response: null,
			};
		}

		await addComment(userId, postId, content);

		const post = await getPost(postId);
		const comments = await getPostCommentsWithAuthor(postId);

		return {
			error: null,
			response: {
				...post,
				comments,
			},
		};
	} catch (error) {
		throw new Error(error);
	}
};
