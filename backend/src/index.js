const express = require('express');
const path = require('path')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('연결 성공');
    })
    .catch(err => {
        console.error(err);
    })

app.get('/', (req, res, next) => {
    setImmediate(() => {next(new Error('error!'))});
});

app.use('/users', require('./routes/users'));
app.use('/shop', require('./routes/shop'));
// app.use('/community', require('./routes/community'));

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.send(error.message || '서버에서 에러가 발생했습니다.');
})


app.use(express.static(path.join(__dirname, '../uploads')));
// app.use(express.static('uploads'));      // 상대 경로
// app.use('/test', express.static('uploads'));         // 가상경로 지정 -> /test/파일 해야 나옴

app.listen(3001, () => {
    console.log(`${port}번 포트에서 실행중`)
});