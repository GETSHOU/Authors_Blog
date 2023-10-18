// эта функция будет отвечать за то, чтобы в фетч передать правильные аргументы, а дальше распарсить запрос из json и превратить его в объект
export const request = (url, method, data) => {
	return fetch(url, {
		headers: {
			'content-type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => res.json());
};
