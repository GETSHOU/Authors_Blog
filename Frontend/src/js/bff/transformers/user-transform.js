export const userTransform = (userData) => ({
	id: userData.id,
	login: userData.login,
	password: userData.password,
	registeredAt: userData.registered_at,
	roleId: userData.role_id,
});
