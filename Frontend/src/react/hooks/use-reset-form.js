import { useEffect } from 'react';
import { useStore } from 'react-redux';

export const useResetForm = (reset) => {
	const store = useStore();

	useEffect(() => {
		let currentIsLogout = store.getState().app.isLogout;

		const unsubscribe = store.subscribe(() => {
			const previousIsLogout = currentIsLogout;
			currentIsLogout = store.getState().app.isLogout;

			if (currentIsLogout !== previousIsLogout) {
				reset();
			}
		});

		return unsubscribe;
	}, [reset, store]);
};
