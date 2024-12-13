const express = require("express");
const router = express.Router();
const Quiz = require("../models/QuizSchema");

// Get All Quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a Quiz
router.post("/", async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json({ message: "Quiz created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit Answers and Calculate Score
router.post("/:id/submit", async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    let score = 0;
    quiz.questions.forEach((q, idx) => {
      const correctAnswers = q.correctAnswers.sort().join(",");
      const userAnswers = answers[idx]?.sort().join(",");
      if (correctAnswers === userAnswers) score++;
    });

    res.status(200).json({ score });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
