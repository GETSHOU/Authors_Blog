import { createAction } from './';
import { ACTION_TYPE } from './';

export const setPostData = (postData) => {
	return createAction(ACTION_TYPE.SET_POST_DATA, postData);
};
