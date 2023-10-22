const bcrypt = require("bcrypt");
const { generate } = require("../helpers/token");
const { User } = require("../models/User.model");
const { ROLES } = require("../constants/roles");

// register
async function register(login, password) {
  // Хэш упадет, если пароль будет пустым, и для того, чтобы на фронт не отправлялась ошибка о падени bcrypt, будем заранее проверять наличие пароля и выбрасывать ошибку
  if (!password) {
    throw new Error("Password is empty");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  // Создаем пользователя
  const user = await User.create({ login, password: passwordHash });

  // когда пользователь зарегистрировался, его нужно сразу залогинить
  // генерируем тоген в регистрации точно также, как и при логине
  const token = generate({ id: user.id });

  // возвращает токен вместе с пользователем
  return { user, token };
}

// login
async function login(login, password) {
  // для начала ищем пользователя
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  // если пароли не совпадают, то выбрасываем ошибку
  if (!isPasswordMatch) {
    throw new Error("Wrong password");
  }

  // иначе генерируем токен
  // для этого создадим отдельный хелпер 'generate', чтобы нам не приходилось в разных частях приложения копировать логику использования модуля 'jsonwebtoken'
  // генерировать будет из идентификатора пользователя
  const token = generate({ id: user.id });

  // возвращаем информацию о пользователе и о токене
  return { token, user };
}

// get users
function getUsers() {
  return User.find();
}

// get roles
function getRoles() {
  return [
    { id: ROLES.ADMIN, name: "Admin" },
    { id: ROLES.MODERATOR, name: "Moderator" },
    { id: ROLES.USER, name: "User" },
  ];
}

// delete user
function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

// update user (roles)
function updateUser(id, userData) {
  // возвращаем документ, который будет содержать уже обновленные данные
  return User.findByIdAndUpdate(id, userData, { returnDocument: "after" }); // если оставить без третьего параметра, то возвращает СТАРЫЕ данные о пользователе
}

module.exports = {
  login,
  register,
  getUsers,
  getRoles,
  updateUser,
  deleteUser,
};
