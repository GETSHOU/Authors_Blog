const mongoose = require("mongoose");
const validator = require("validator");

// благодаря timestamps, mongoose будет добавлять каждому документу поля 'created_at' и 'updated_at', где будут храниться даты создания и редактирования этого документа
// URL картинки мы будем отдельно валидировать при помощи пакета validator
const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: "Image should be a valid url",
      },
    },
    content: {
      type: String,
      required: true,
    },
    comments: [
      // Нам нужно связать пост с коментариями
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = {
  Post,
};
