const { default: mongoose, Schema } = require("mongoose");

const communitySchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxLength: 50
    },
    contents: String,
    images: {
        type: Array,
        default: []
    },
    categories: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
        default: []
    }
})

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;