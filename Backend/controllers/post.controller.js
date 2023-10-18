const { Post } = require("../models/Post.model");

// add
async function addPost(post) {
  const newPost = await Post.create(post);

  await newPost.populate({
    path: "comments",
    populate: "author",
  });

  return newPost;
}

// update post
async function updatePost(id, post) {
  const updatedPost = await Post.findByIdAndUpdate(id, post, {
    returnDocument: "after",
  });

  await updatedPost.populate({
    path: "comments",
    populate: "author",
  });

  return updatedPost;
}

// delete post
function deletePost(id) {
  return Post.deleteOne({ _id: id });
}

// get posts list with search and pagination
async function getPosts(search = "", limit = 10, page = 1) {
  // 'limit' - сколько элементов находится на странице, 'page' - текущая страница, на которой находится пользователь
  // дальше необходимо найти все посты по 'search', пропустить 'limit' постов
  // при этом нам нужно сказать фронту сколько вообще страниц, т.к. нужно отображать пагинацию
  // без переключения по страницам будет очень неудобно пользоваться лентой постов
  // поэтому делаем сразу два синхронных запроса запроса, чтобы они загружались параллельно

  const [posts, count] = await Promise.all([
    Post.find({ title: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }), // -1 - сортировка по убыванию, чтоб самые новые посты были в самом начале
    Post.countDocuments({ title: { $regex: search, $options: "i" } }), // сколько есть таких постов
  ]);

  return {
    posts,
    lastPage: Math.ceil(count / limit),
  };
}

// get one post
function getPost(id) {
  // при получении одного поста будем разворачивать его комментарии
  return Post.findById(id).populate({
    path: "comments",
    populate: "author",
  });
}

module.exports = {
  addPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
};
