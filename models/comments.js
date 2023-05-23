const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    //comment belongs to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Likes"
        }
    ]
}, {
    timeStamps: true,
    toJSON: { virtuals: true }
})

//telling mongoose that this will be a model/collection
const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;