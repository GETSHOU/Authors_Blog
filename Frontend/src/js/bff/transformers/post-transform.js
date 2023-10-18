export const postTransform = (postData) => ({
	id: postData.id,
	title: postData.title,
	content: postData.content,
	imageUrl: postData.image_url,
	publishedAt: postData.published_at,
});
