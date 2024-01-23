const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({storage: storage}).single('file');



router.post('/', auth, async(req, res, next) => {
    try {
        const product = new Product(req.body);
        product.save();
        return res.sendStatus(201);
    } catch (error) {
        next(error);
    };
});

router.post('/image', auth, async(req, res, next) => {
    upload(req, res, err => {
        if(err){
            return req.status(500).send(err);
        }
        return res.json({fileName: res.req.file.filename});
    });
});


router.get('/', async (req, res, next) => {

    const order = req.query.order ? req.query.order : 'desc';
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const term = req.query.searchTerm;

    let findArgs = {};
    for(let key in req.query.filters){
        if(req.query.filters[key].length > 0){

            if(key === 'price'){
                findArgs[key] = {
                    // greater than equal
                    $gte: req.query.filters[key][0],
                    // less than equal
                    $lte: req.query.filters[key][1]
                }
            } else{
                findArgs[key] = req.query.filters[key];
            }
        };
    };

    if(term){
        // 검색어와 완전히 일치할 경우만 나타남
        // findArgs["$text"] = {$search: term}
        
        // 검색어가 들어가있으면 나타남
        findArgs["title"] = {'$regex': term}
    };


    try {
        const products = await Product.find(findArgs)
            .populate('writer')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit);

        const productsTotal = await Product.countDocuments(findArgs);
        const hasMore = skip + limit < productsTotal ? true : false;

        return res.status(200).json({
            products,
            hasMore
        });
    } catch (error) {
        next(error);
    };
});


router.get('/:id', auth, async(req, res, next) => {
    const type = req.query.type;
    let productIds = req.params.id;

    if(type === 'array'){
        // id = 123213213213,53215324132,41324321423 인 상태를
        // productIds = ['123213213213', '53215324132', '41324321423']로 바꿔줌
        let ids = productIds.split(',');
        productIds = ids.map(item => {
            return item;
        });
    }

    // productId를 이용해서 DB에서 productId와 같은 상품 정보를 가져옴
    try {
        const product = await Product
            .find({_id: {$in: productIds}})
            .populate('writer');

        return res.status(200).send(product);
    } catch (error) {
        next(error);
    }
})

module.exports = router
