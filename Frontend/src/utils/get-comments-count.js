export const getCommentsCount = (commentsLength) => {
	const text =
		commentsLength % 10 === 1 && commentsLength % 100 !== 11
			? 'комментарий'
			: commentsLength % 10 >= 2 &&
			  commentsLength % 10 <= 4 &&
			  (commentsLength % 100 < 10 || commentsLength % 100 >= 20)
			? 'комментария'
			: 'комментариев';

	return `${commentsLength} ${text}`;
};
