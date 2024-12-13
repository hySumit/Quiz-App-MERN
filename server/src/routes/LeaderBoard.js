const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/LeaderBoardSchema");

// Get Leaderboard
router.get("/", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().populate("quizId userId", "title username");
    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Score to Leaderboard
router.post("/", async (req, res) => {
  try {
    const leaderboardEntry = new Leaderboard(req.body);
    await leaderboardEntry.save();
    res.status(201).json({ message: "Score added to leaderboard!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
