import { BASE_SERVER_URL, END_POINT } from '../../services';
import { postTransform } from '../transformers';

export const getPosts = async (page, limit, searchQuery) =>
	fetch(
		`${BASE_SERVER_URL}/${END_POINT.POSTS}?title_like=${searchQuery}&_page=${page}&_limit=${limit}`,
	)
		.then((loadedPosts) =>
			Promise.all([loadedPosts.json(), loadedPosts.headers.get('Link')]),
		)
		.then(([loadedPosts, links]) => ({
			posts: loadedPosts && loadedPosts.map(postTransform),
			links,
		}));
