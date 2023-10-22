const { User } = require("../models/User.model");
const { verify } = require("../helpers/token");

// мидлвара, которая будет проверять, что пользователь залогинен
// будем расшифровывать наш токен и искать пользователя по id
module.exports = async function (req, res, next) {
  try {
    //  разбираем наш токен
    const tokenData = verify(req.cookies.token);

    // ищем пользователя, используя модель 'User'
    const user = await User.findOne({ _id: tokenData.id });

    // если пользователя нет, то выбрасываем ошибку
    // но вместо выбрасывания ошибки мы можем передавать ее на фронт, потому что у нас есть доступ к объекту 'response'
    if (!user) {
      res.send({ error: "Authenticated user not found" });

      return;
    }

    // иначе в реквест добавляем поле user со всей информацией о пользователе
    req.user = user;

    next();
  } catch (e) {
    res.send({ error: e.message || 'Token error' });
  }
};
