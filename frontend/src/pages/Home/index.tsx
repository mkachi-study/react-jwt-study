import React, { useState } from 'react'
import styles from './style.module.css'

import { useCookies } from 'react-cookie'

const Home = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const [message, setMessage] = useState('')
  return <div>
    {(!cookies.token) ? <div>
      <p>{'Account'}</p>
      <input className={styles['input']} type={'text'} onChange={(event) => setAccount(event.target.value)} />
      <p>{'Password'}</p>
      <input className={styles['input']} type={'password'} onChange={(event) => setPassword(event.target.value)} />
      <p>
        <button onClick={async () => {
          try {
            const response = await fetch('http://localhost:9003/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                account,
                password
              })
            })
            const json = await response.json()
            if (json.is_valid) {
              console.log(`토큰 받음: ${json.token}`)
              setCookie('token', json.token)
            }
          } catch (error) {
            console.log(error.message)
          }
        }}>
          {'Login'}
        </button>
      </p>
    </div> :
      <p>{'토큰 있음'}</p>}
    <br />

    <button onClick={() => {
      removeCookie('token')
      setMessage('')
    }}>
      {'Cookie 삭제'}
    </button>
    <br />

    <button onClick={async () => {
      try {
        const response = await fetch('http://localhost:9003/verify', {
          method: 'GET',
          credentials: 'include'
        })
        console.log(response)
        const json = await response.json()
        console.log(2)
        if (json.success) {
          setMessage('인증됨')
        } else {
          setMessage(`인증 실패: ${json.message}`)
        }
      } catch (error) {
        console.log(error)
        setMessage(`Error: ${error}`)
      }
    }}>
      {'Verify Check'}
    </button>
    <p>{message}</p>
  </div>
}

export default Home
