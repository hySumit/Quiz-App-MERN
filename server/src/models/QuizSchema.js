const {Schema,model} = require('mongoose')

const QuizSchema = new Schema({
    title:{
        type:String,
        required:true,
    },

    questions:[
        {
            type:{
                type:String,
                enum:['single-choice',"multiple-choice", 'true-false'],
                required:true,
            },

            questionText : {
                type: String,
                required:true,
            },

            options:[
                {
                    text :{type:String},
                    isCorrect:{type:Boolean},
                }
            ],

            correctAnswers : [Strings],
        },
    ],

    createdBy : {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    createdAt : {
        type: Date,
        default: Date.now,
    }
})

const QuizModel = model("Quiz",QuizSchema);

module.exports = QuizModel