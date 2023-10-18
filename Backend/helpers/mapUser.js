// Если нам нужно отправить только определенные данные на фронт, то для этого создаются такие функции, в которые мы передаем то, что хотим отправить на фронт
module.exports = function (user) {
  return {
    id: user.id,
    login: user.login,
    roleId: user.role,
    registeredAt: user.createdAt,
  };
};
