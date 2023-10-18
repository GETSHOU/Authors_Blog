import { BASE_SERVER_URL, END_POINT } from '../../services';
import { getCurrentDate } from '../utils';

export const addComment = (userId, postId, content) =>
	fetch(`${BASE_SERVER_URL}/${END_POINT.COMMENTS}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			author_id: userId,
			post_id: postId,
			content,
			published_at: getCurrentDate(),
		}),
	});
