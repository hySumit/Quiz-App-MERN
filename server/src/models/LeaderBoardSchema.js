const {Schema,model} = require("mongoose")

const LeaderBoardSchema = new Schema({
    quizId:{
        type: Schema.Types.ObjectId,
        ref:"Quiz",
        required:true,
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    
    username:{
        type:String,
        required:true,
    },

    score:{
        type:Number,
        required:true,
    },

    date:{
        type:Date,
        default: Date.now,
    },
});

const LeaderBoardModel = model("Leaderboard", LeaderBoardSchema )

module.exports = LeaderBoardModel