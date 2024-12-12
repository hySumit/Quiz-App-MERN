const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  scores: [
    {
      quizID: {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
      },

      score: {
        type: Number,
        required: true,
      },

      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const userModel =  model("User",UserSchema)

module.exports = userModel