import { ACTION_TYPE } from './action-type';
import { createAction } from './layouts/create-action';

export const addComment = (comment) => createAction(ACTION_TYPE.ADD_COMMENT, comment);
