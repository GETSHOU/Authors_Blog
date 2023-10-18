import { deletePost, getComments, deleteComment } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../server-constants';

export const removePost = async (hash, postId) => {
	try {
		const accessRoles = [ROLE.ADMIN];

		const access = await sessions.checkAccess(hash, accessRoles);

		if (!access) {
			return {
				error: 'Доступ запрещен',
				response: null,
			};
		}

		await deletePost(postId);

		const comments = await getComments(postId);

		await Promise.all(comments.map(({ id: commentId }) => deleteComment(commentId)));

		await deleteComment(postId);

		return {
			error: null,
			response: true,
		};
	} catch (error) {
		throw new Error(error);
	}
};
