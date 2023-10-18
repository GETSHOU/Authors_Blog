import { createAction } from './';
import { ACTION_TYPE } from './';

export const resetPostData = () => createAction(ACTION_TYPE.RESET_POST_DATA);
