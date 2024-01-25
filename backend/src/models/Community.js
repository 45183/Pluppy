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

// Mongo DB Partial Text Search
// 게시글 작성자 검색하려면 그냥 writer로는 검색되지 않음 -> 수정 필요
communitySchema.index({
    // 검색할 내용
    title: 'text',
    contents: 'text',
    writer: 'text'
}, {
    weights: { 
        // 중요도 (클수록 중요도 높음)
        title: 5,
        contents: 1,
        writer: 3
    }
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;