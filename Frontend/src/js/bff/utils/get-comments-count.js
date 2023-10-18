export const getCommentsCount = (comments, postId) => {
	const postComments = comments.filter(
		({ postId: commentPostId }) => commentPostId === postId,
	);
	const commentsCounter = postComments.length;
	const text =
		commentsCounter % 10 === 1 && commentsCounter % 100 !== 11
			? 'комментарий'
			: commentsCounter % 10 >= 2 &&
			  commentsCounter % 10 <= 4 &&
			  (commentsCounter % 100 < 10 || commentsCounter % 100 >= 20)
			? 'комментария'
			: 'комментариев';

	return `${commentsCounter} ${text}`;
};
