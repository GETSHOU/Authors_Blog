require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  login,
  register,
  getUsers,
  getRoles,
  updateUser,
  deleteUser,
} = require("./controllers/user.controller");
const {
  addPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
} = require("./controllers/post.controller");
const {
  addComment,
  deleteComment,
} = require("./controllers/comment.controller");
const mapUser = require("./helpers/mapUser");
const mapPost = require("./helpers/mapPost");
const mapComment = require("./helpers/mapComment");
const authenticated = require("./middlewares/authenticated");
const hasRole = require("./middlewares/hasRole");
const { ROLES } = require("./constants/roles");

const port = 3001;
const app = express();

app.use(express.static('../Frontend/build'))

// подключаем middlewares
app.use(cookieParser());
app.use(express.json());

// Registration
app.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    // здесь нам нужно еще установить токен в куки, и для того, чтобы этим не занимался сам контроллер мы будем на выходе ожидать объект с двумя полями 'user' и 'token'
    const { user, token } = await login(req.body.login, req.body.password);

    // устанавливаем токен в куки и добавляем опцию 'httpOnly: true', чтобы не было доступа из JS, и отправляем ответ с пользователем 'send()'
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

// Logout
app.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

// вывод постов подключаем до 'authenticated', потому что просматривать их могут и не авторизованные пользователи

app.get("/posts", async (req, res) => {
  const { posts, lastPage } = await getPosts(
    req.query.search,
    req.query.limit,
    req.query.page
  );

  res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

// Подключаем контроллер одного поста
app.get("/posts/:id", async (req, res) => {
  const post = await getPost(req.params.id);

  res.send({ data: mapPost(post) });
});

// далее, подключаем контроллеры, но только после подключения мидлвары 'authenticated', потому что только аутентифицированный пользователь и только пользователь с ролью админ может получать доступ к этим контроллерам
app.use(authenticated);

// получаем пользователей (только с правами админа)
app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();

  res.send({ data: users.map(mapUser) });
});

// получение ролей
app.get("/users/roles", hasRole([ROLES.ADMIN]), (req, res) => {
  const roles = getRoles();

  res.send({ data: roles });
});

// редактирование пользователя
app.patch("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  // админ в данном случае может менять только роли, так что добавляем в опции, вторым аргументом, только одно поле
  const newUser = await updateUser(req.params.id, {
    role: req.body.roleId,
  });

  res.send({ data: mapUser(newUser) });
});

// удаление пользователя
app.delete("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id);

  res.send({ error: null });
});

// добавление поста
app.post("/posts", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newPost = await addPost({
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
  });

  res.send({ data: mapPost(newPost) });
});

// добавление поста
app.patch("/posts/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const updatedPost = await updatePost(req.params.id, {
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
  });

  res.send({ data: mapPost(updatedPost) });
});

// удаление поста
app.delete("/posts/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deletePost(req.params.id);

  res.send({ error: null });
});

// добавление комментария
app.post("/posts/:id/comments", async (req, res) => {
  // для пользователя мы передаем идентификатор и получаем его не из фронта, а из мидлвары authenticated
  // она добавляет в req.user пользователя и мы можем взять оттуда id
  // так мы не позволим одному пользователю представиться другим
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });

  res.send({ data: mapComment(newComment) });
});

// удаление комментария
app.delete(
  "/posts/:postId/comments/:commentId",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);

    res.send({ error: null });
  }
);

// подключаемся к базе данных
// после последнего слеша указываем имя базы
mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server has been started on port ${port} ...`);
  });
});
