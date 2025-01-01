const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const { shuffleArray } = require("../utils.js");

// Get questions by language
router.get("/:language", async (req, res) => {
  try {
    const { language } = req.params;
    const { difficulty, categoryId, amount } = req.query;

    // Build the query object
    let query = {
      [`translations.${language}`]: { $exists: true },
    };

    // Add difficulty filter if provided
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Add categoryId filter if provided
    if (categoryId) {
      query.categoryId = categoryId;
    }

    const questions = await Question.find(query);

    const localizedQuestions = questions.map((question) => ({
      type: question.type,
      difficulty: question.difficulty,
      category: question.category,
      categoryId: question.categoryId,
      ...question.translations[language],
    }));

    // Shuffle the localized questions
    shuffleArray(localizedQuestions);

    // Limit the number of questions based on the 'amount' query parameter
    const limitedQuestions = localizedQuestions.slice(
      0,
      Number(amount) || 1000
    );

    res.json({ results: limitedQuestions });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Add a question
router.post("/", async (req, res) => {
  const { type, difficulty, category, language, translation } = req.body;

  try {
    let question = await Question.findOne({ type, difficulty, category });
    if (!question) {
      question = new Question({
        type,
        difficulty,
        category,
        translations: { [language]: translation },
      });
    } else {
      question.translations[language] = translation;
    }

    const savedQuestion = await question.save();
    res.json(savedQuestion);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
