import { createAction } from './';
import { ACTION_TYPE } from './action-type';

export const closeModal = () => createAction(ACTION_TYPE.CLOSE_MODAL);
