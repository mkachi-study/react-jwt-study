const express = require('express')
const jwt = require('jsonwebtoken')

const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
const port = 9003

// 테스트용이라 그냥 둠
const TEST_SECRET_KEY = 'test-jwt-key'

app.use(
  express.urlencoded({
    extended: true
  })
  )
app.use(cors({
  credentials: true,
  origin: `http://localhost:9000`
}))
app.use(express.json())
app.use(cookieParser())

app.post('/login', (req, res) => {
  try {
    const account = req.body.account
    const password = req.body.password

    const payload = {
      account,
      password
    }

    jwt.sign(payload, TEST_SECRET_KEY, {
      expiresIn: '1m' // 1분 동안 유효
    }, (error, token) => {
        if (error) {
          throw error
        }

        console.log(`토큰 발급: ${token}`)
        res.json({
          is_valid: true,
          token
        })
    })
  } catch (error) {
    console.log(`발급 실패: ${error.message}`)
    res.json({
      is_valid: false,
      error: error.message
    })
  }
})

app.get('/verify', (req, res) => {
  try {
    const token = req.cookies.token
    const decoded = jwt.verify(token, TEST_SECRET_KEY)
    if (decoded) {
      console.log('인증')
      console.log(decoded)
      res.json({
        success: true
      })
    }
  } catch (error) {
    console.log(`인증 실패: ${error.message}`)
    res.json({
      success: false,
      message: error.message
    })
  }
})

app.listen(port, () => {
  console.log(`JWT server running at ${port}`)
})
