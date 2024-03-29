const express =require('express');
const Community = require('../models/Community');
const router = express.Router();
const auth = require('../middleware/auth');
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
        const community = new Community(req.body);
        community.save();
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
        findArgs[key] = req.query.filters[key];
    };

    if(term){
        // 검색어와 완전히 일치할 경우만 나타남
        // findArgs["$text"] = {$search: term}
        
        // 검색어가 들어가있으면 나타남
        findArgs["title"] = {'$regex': term}
    };

    try {
        const community = await Community.find(findArgs)
            .populate('writer')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit);

        const communityTotal = await Community.countDocuments(findArgs);
        const hasMore = skip + limit < communityTotal ? true : false;

        return res.status(200).json({
            community,
            hasMore
        });
    } catch (error) {
        next(error);
    };
})

router.get('/:id', auth, async(req, res, next) => {
    const type = req.query.type;
    let communityIds = req.params.id;

    if(type === 'array'){
        let ids = productIds.split(',');
        communityIds = ids.map(item => {
            return item;
        });
    }

    try {
        const community = await Community
            .find({_id: {$in: communityIds}})
            .populate('writer');

        return res.status(200).send(community);
    } catch (error) {
        next(error);
    }
})


module.exports = router;