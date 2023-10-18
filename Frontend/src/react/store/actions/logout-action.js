import { createAction } from '.';
import { ACTION_TYPE } from '.';
import { server } from '../../../js/bff';

export const logoutAction = (session) => {
	server.logout(session);
	sessionStorage.removeItem('userData');

	return createAction(ACTION_TYPE.LOGOUT);
};
