import { ACTION_TYPE } from './action-type';
import { createAction } from './layouts/create-action';

export const removeComment = (commentId) =>
	createAction(ACTION_TYPE.REMOVE_COMMENT, commentId);
