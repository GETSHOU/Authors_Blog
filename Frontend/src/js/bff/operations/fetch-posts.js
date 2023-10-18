import { getComments, getPosts } from '../api';
import { getCommentsCount } from '../utils';

export const fetchPosts = async (page, limit, searchQuery) => {
	try {
		const [{ posts, links }, comments] = await Promise.all([
			getPosts(page, limit, searchQuery),
			getComments(),
		]);

		return {
			error: null,
			response: {
				posts: posts.map((post) => ({
					...post,
					commentsCount: getCommentsCount(comments, post.id),
				})),
				links,
			},
		};
	} catch (error) {
		throw new Error(error);
	}
};
