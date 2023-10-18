import { deleteComment, getPost } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../server-constants';
import { getPostCommentsWithAuthor } from '../utils';

export const removePostComment = async (hash, postId, commentId) => {
	try {
		const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

		const access = await sessions.checkAccess(hash, accessRoles);

		if (!access) {
			return {
				error: 'Доступ запрещен',
				response: null,
			};
		}

		await deleteComment(commentId);

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
