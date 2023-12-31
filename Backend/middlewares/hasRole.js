// мидлвара, которая будет заниматься проверкой ролей пользователя
// она надеется, что в объекте запроса уже есть пользователь, т.е. до нее нужно будет обязательно подключить мидлвару 'authenticated'
// она будет отдавать функцию, которая вернет функцию

module.exports = function (roles) {
  // будем принимать массив ролей и возвращать функцию, которая будет проверять,что у поользователя есть одна их этиъ ролей,
  return (req, res, next) => {
    // если у него этой роли нет, тогда мы отправляем на фронт ошибку
    if (!roles.includes(req.user.role)) {
      res.send({ error: "Access denied" });
    }

    // иначе, пропускаем пользователя дальше
    next();
  };
};
