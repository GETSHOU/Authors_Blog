import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { userSessionSelector } from '../store/selectors';
import { server } from '../../js/bff';

export const useServerRequest = () => {
	const session = useSelector(userSessionSelector);

	return useCallback(
		(operation, ...params) => {
			const request = [
				'registration',
				'authorization',
				'fetchPost',
				'fetchPosts',
			].includes(operation)
				? params
				: [session, ...params];

			return server[operation](...request);
		},
		[session],
	);
};
