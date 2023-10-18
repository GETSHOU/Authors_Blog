import { setPostData } from './';

export const removeCommentAsync = (requestServer, postId, commentId) => (dispatch) => {
	requestServer('removePostComment', postId, commentId).then((postData) => {
		dispatch(setPostData(postData.response));
	});
};
