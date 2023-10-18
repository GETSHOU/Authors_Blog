const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      // Нам нужно каким-то образом связать кользоветелей с коментариями. Делаем это через mongoose
      type: mongoose.Schema.Types.ObjectId, // автор, являющийся идентификатором пользователя
      ref: "User", // с помощью поля ref мы указываем имя модели, на которую мы ссылаемся, т.е. на модель User
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = {
  Comment,
};
