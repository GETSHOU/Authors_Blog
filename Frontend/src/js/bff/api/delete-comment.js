import { BASE_SERVER_URL, END_POINT } from '../../services';

export const deleteComment = async (commentId) => {
	fetch(`${BASE_SERVER_URL}/${END_POINT.COMMENTS}/${commentId}`, {
		method: 'DELETE',
	});
};
