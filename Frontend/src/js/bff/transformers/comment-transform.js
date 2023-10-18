export const commentTransform = (commentData) => ({
	id: commentData.id,
	authorId: commentData.author_id,
	postId: commentData.post_id,
	content: commentData.content,
	publishedAt: commentData.published_at,
});
