import { request } from '../../../utils';
import { setPostData } from './set-post-data';

export const savePostAsync = (postId, newPostData) => (dispatch) => {
	const saveRequest = postId
		? request(`/posts/${postId}`, 'PATCH', newPostData)
		: request('/posts', 'POST', newPostData);

	return saveRequest.then((updatedPost) => {
		dispatch(setPostData(updatedPost.data));

		return updatedPost.data;
	});
};
