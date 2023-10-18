import { BASE_SERVER_URL, END_POINT } from '../../services';

export const updatePost = ({ id, title, content, imageUrl }) =>
	fetch(`${BASE_SERVER_URL}/${END_POINT.POSTS}/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title,
			content,
			image_url: imageUrl,
		}),
	}).then((loadedPost) => loadedPost.json());
