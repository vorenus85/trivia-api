const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  type: String,
  difficulty: String,
  category: String,
  categoryId: Number,
  translations: {
    en: {
      question: { type: String, required: true },
      correct_answer: { type: String, required: true },
      incorrect_answers: [String],
    },
    hu: {
      question: { type: String },
      correct_answer: { type: String },
      incorrect_answers: [String],
    },
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
