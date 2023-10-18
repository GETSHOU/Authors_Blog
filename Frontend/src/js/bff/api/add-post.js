import { BASE_SERVER_URL, END_POINT } from '../../services';
import { getCurrentDate } from '../utils';

export const addPost = ({ title, content, imageUrl }) =>
	fetch(`${BASE_SERVER_URL}/${END_POINT.POSTS}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title,
			content,
			image_url: imageUrl,
			published_at: getCurrentDate(),
		}),
	}).then((createdPost) => createdPost.json());
