export const sessionTransform = (sessionData) => ({
	id: sessionData.id,
	hash: sessionData.hash,
	user: sessionData.user,
});
