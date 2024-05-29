const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
const mongodb = 'mongodb+srv://tmdgns5945:tmdgns0403@cluster0.ypnovvs.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('DB연결 성공'))
.catch((err) => console.log(err));

// User 모델 정의
const User = mongoose.model('User', {
  username: String,
  password: String
});

app.use(express.json());
app.use(cors());

// JWT 시크릿 키
const secretKey = 'mySecretKey';

app.get('/', (req, res) => {
  res.send('접속됨');
});


// 사용자 로그인 요청 처리
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // 사용자 확인
    const user = await User.findOne({ username, password });
    if (user) {
      // JWT 토큰 생성
      const token = jwt.sign({ username }, secretKey);
      res.json({ token });
    } else {
      res.status(401).json({ message: '인증 실패: 사용자 정보가 일치하지 않습니다.' });
    }
  } catch (error) {
    res.status(500).json({ message: '서버 에러: ' + error.message });
  }
});

app.listen(8000, () => console.log('서버 진행중'));
