export const createAction = (type, payload) => {
	if (!type) {
		throw new Error('Не передан "TYPE_ACTION"!');
	}

	if (typeof type !== 'string') {
		throw new Error('"TYPE_ACTION" должен быть строкой!');
	}

	return {
		type,
		...(payload && { payload }),
	};
};
