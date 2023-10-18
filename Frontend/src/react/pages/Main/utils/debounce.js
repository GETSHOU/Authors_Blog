export const debounce = (fn, delay) => {
	let timeoutId;

	return (...args) => {
		clearTimeout(timeoutId);
		// то же, что и setTimeout(() => fn(...args), delay)
		timeoutId = setTimeout(fn, delay, ...args);
	};
};
