import { BASE_SERVER_URL, END_POINT } from '../../services';
import { commentTransform } from '../transformers';

const ALL_COMMENTS_URL = `${BASE_SERVER_URL}/${END_POINT.COMMENTS}`;
const POST_COMMENTS_URL = (id) =>
	`${BASE_SERVER_URL}/${END_POINT.COMMENTS}?post_id=${id}`;

export const getComments = async (postId) => {
	const url = postId === undefined ? ALL_COMMENTS_URL : POST_COMMENTS_URL(postId);

	return fetch(url)
		.then((loadedComments) => loadedComments.json())
		.then((loadedComments) => loadedComments.map(commentTransform));
};
