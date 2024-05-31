const express = require('express'); // 필수, express 임포트
const cors = require('cors'); // 권장, CORS 정책 우회
const mongoose = require('mongoose'); // 필수, 몽고DB 임포트
const jwt = require('jsonwebtoken');  // 필수, JSON Web Token 임포트

const app = express();  // 필수, Express 애플리케이션 생성
const mongodb = 'mongodb+srv://tmdgns5945:tmdgns0403@cluster0.ypnovvs.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0';  // 필수, 몽고DB 연결 URI

mongoose.connect(mongodb, {
  useNewUrlParser: true, // 필수, 새로운 URL 파서 사용
  useUnifiedTopology: true // 필수, 새로운 연결 관리 엔진 사용
})
.then(() => console.log('DB연결 성공'))
.catch((err) => console.log(err));

// User 모델 정의
const User = mongoose.model('User', {
  username: String, // 필수, 사용자 이름 필드
  password: String  // 필수, 비밀번호 필드
});

app.use(express.json()); // 필수, JSON 요청 본문 파싱 미들웨어
app.use(cors()); // 권장, CORS 미들웨어

// JWT 시크릿 키
const secretKey = 'mySecretKey'; // 필수, JWT 시크릿 키

app.get('/', (req, res) => {
  res.send('접속됨'); // 필수, 기본 라우트
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

// 회원가입 요청 처리


// 사용자 회원가입 요청 처리
app.post('/signup', async (req, res) => {
  const { nickname, username, password } = req.body;
  try {
    // 새로운 사용자 생성
    const newUser = new User({ nickname, username, password });
    // 사용자 저장
    await newUser.save();
    res.status(201).json({ message: '회원가입 성공' });
  } catch (error) {
    res.status(500).json({ message: '서버 에러: ' + error.message });
  }
});

app.listen(8000, () => console.log('서버 진행중')); // 필수, 서버 시작
