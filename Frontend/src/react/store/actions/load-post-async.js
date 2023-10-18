import { setPostData } from './';

export const loadPostAsync = (requestServer, postId) => (dispatch) =>
	requestServer('fetchPost', postId).then((postData) => {
		if (postData.response) {
			dispatch(setPostData(postData.response));
		}

		return postData;
	});
