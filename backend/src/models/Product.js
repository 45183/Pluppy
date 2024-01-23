const { default: mongoose, Schema } = require('mongoose');

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxLength: 50
    },
    description: String,
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    // 팔린 개수
    sold: {
        type: Number,
        default: 0
    },
    // category -> ex) 강아지, 고양이 (1, 2)
    categories: {
        type: Number,
        default: 1
    },
    // 조회수
    views: {
        type: Number,
        default: 0
    }
});

// Mongo DB Partial Text Search
productSchema.index({
    // 검색할 내용
    title: 'text',
    description: 'text'
}, {
    weights: { 
        // 중요도 (클수록 중요도 높음)
        title: 5,
        description: 1
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;