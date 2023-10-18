import { createAction } from './';
import { ACTION_TYPE } from '.';

export const closeModal = () => createAction(ACTION_TYPE.CLOSE_MODAL);
