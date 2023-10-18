import { createAction } from './';
import { ACTION_TYPE } from '.';

export const setUserAction = (user) => createAction(ACTION_TYPE.SET_USER, user);
