const { Comment } = require("../models/Comment.model");
const { Post } = require("../models/Post.model");

// add
async function addComment(postId, comment) {
  const newComment = await Comment.create(comment);

  // нам нужно найти наш пост и добавить в него комментарий
  // $push - добавление комментария в массив comments
  await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } });

  // превращаем автора из безликого идентификатора в объект с информацией об авторе
  // т.к. в комментах есть связь с автором мы можем попросить 'mongoose' заполнить информацию об авторе за нас
  // для этого используется метод 'populate'
  await newComment.populate("author");

  return newComment;
}

// delete
async function deleteComment(postId, commentId) {
  // сначала удалим сам комментарий
  await Comment.deleteOne({ _id: commentId });

  // а после уберем у поста этот комментарий из массива, используя операцию '$pull'
  await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
}

// get comments list for post
// контроллер получения списка коментариев для поста нам не понадобится, потому что при получении поста у нас уже есть вся необходимая информация
// с помощью populate мы избавили наш фронт от необходимости делать один лишний запрос

module.exports = {
  addComment,
  deleteComment,
};
