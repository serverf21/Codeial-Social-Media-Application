const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    //this defines object id of liked object
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel"
    },
    //this is used for defining the types of the liked object since this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ["Posts", "Comments"]
    }
}, {
    timestamps: true
})

const Likes = mongoose.model("Likes", likesSchema);
module.exports = Likes;