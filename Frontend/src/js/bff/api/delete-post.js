import { BASE_SERVER_URL, END_POINT } from '../../services';

export const deletePost = (postId) =>
	fetch(`${BASE_SERVER_URL}/${END_POINT.POSTS}/${postId}`, {
		method: 'DELETE',
	});
