import { createAction } from './';
import { ACTION_TYPE } from '.';

export const openModal = (modalParams) =>
	createAction(ACTION_TYPE.OPEN_MODAL, modalParams);
