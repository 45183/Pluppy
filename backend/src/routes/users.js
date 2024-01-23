const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Product = require('../models/Product');

router.get('/auth', auth, async (req, res, next) => {
    return res.json({
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image, 
        cart: req.user.cart,
        like: req.user.like,
        history: req.user.history
    })
});

router.post('/register', async (req, res, next) => {
    // 유저 데이터를 저장
    try{
        const user = new User(req.body);
        await user.save();

        return res.sendStatus(200);
    } catch(error){
        next(error);
    }
});


router.post('/login', async (req, res, next) => {
    // req.body -> email, password
    try{
        // 존재하는 user인지 확인
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.status(400).send("존재하지 않는 이메일입니다.");
        };

        // 존재하면 비밀번호가 올바른 것인지 확인
        const isMatch = await user.comparePassword(req.body.password);
        if(!isMatch){
            return res.status(400).send('비밀번호가 일치하지 않습니다.');
        };

        // mongodb의 _id는 objectId로 되어있어서 
        const payload = {
            userId: user._id.toHexString(),
        };

        // token 생성
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

        return res.json({user, accessToken});

    } catch(error){
        next(error);
    };
});

router.post('/logout', auth, async (req, res, next) => {
    try{
        return res.sendStatus(200);
    } catch(error){
        next(error);
    };
});


router.post('/cart', auth, async (req, res, next) => {
    try {
        // 먼저 User Collection의 해당 유저의 정보 가져오기
        const userInfo = await User.findOne({_id: req.user._id})

        // 가져온 정보에서 카트에 넣으려 하는 상품이 이미 들어 있는지 확인
        let duplicate = false;
        userInfo.cart.forEach((item) => {
            if(item.id === req.body.productId){
                duplicate = true;
            }
        });

        // 상품이 이미 있을 때
        if (duplicate) {
            const user = await User.findOneAndUpdate(
                { _id: req.user._id, "cart.id": req.body.productId },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true }
            )

            return res.status(201).send(user.cart);
        } else {
            // 상품이 없을 때
            const user = await User.findOneAndUpdate(
                {_id: req.user._id},
                {
                    $push: {
                        cart: {
                            id: req.body.productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                {new: true}
            )

            return res.status(201).send(user.cart);
        }
    } catch (error) {
        next(error);
    }
})

router.post('/like', auth, async (req, res, next) => {
    try {
        // 먼저 User Collection의 해당 유저의 정보 가져오기
        const userInfo = await User.findOne({_id: req.user._id})

        // 가져온 정보에서 찜목록에 넣으려 하는 상품이 이미 들어 있는지 확인
        let duplicate = false;
        userInfo.like.forEach((item) => {
            if(item.id === req.body.productId){
                duplicate = true;
            }
        });

        // 상품이 이미 있을 때  --- 수정 필요 -> 삭제되게
        if(duplicate){
            const user = await User.findOneAndUpdate(
                {_id: req.user._id, "like.id": req.body.productId},
                {
                    $pull: {
                        like: { 
                            id: req.body.productId 
                        } 
                    }
                },
                {new: true}
            )
            return res.status(201).send(user.like);
        } else {
            // 상품이 없을 때
            const user = await User.findOneAndUpdate(
                {_id: req.user._id},
                {
                    $push: {
                        like: {
                            id: req.body.productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                {new: true}
            )

            return res.status(201).send(user.like);
        }
    } catch (error) {
        next(error);
    }
})


router.delete('/cart', auth, async (req, res, next) => {
    try {
        // 먼저 cart 안의 지우려고 한 상품 지워주기
        const userInfo = await User.findOneAndUpdate(
            {_id:req.user._id},
            {
                $pull: {
                    cart: {
                        id: req.query.productId
                    }
                }
            },
            {new: true}
        )

        const cart = userInfo.cart;

        const array = cart.map(item => {
            return item.id;
        })

        const productInfo = await Product
            .find({_id: {$in: array}})
            .populate('writer')

        return res.json({
            productInfo,
            cart
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/like', auth, async (req, res, next) => {
    try {
        // 먼저 like 안의 지우려고 한 상품 지워주기
        const userInfo = await User.findOneAndUpdate(
            {_id:req.user._id},
            {
                $pull: {
                    like: {
                        id: req.query.productId
                    }
                }
            },
            {new: true}
        )

        const like = userInfo.like;

        const array = like.map(item => {
            return item.id;
        })

        const productInfo = await Product
            .find({_id: {$in: array}})
            .populate('writer')

        return res.json({
            productInfo,
            like
        })
    } catch (error) {
        next(error)
    }
})


module.exports = router;