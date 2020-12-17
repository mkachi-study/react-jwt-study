import React, { useState } from 'react'
import styles from './style.module.css'

const Home = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const [token, setToken] = useState('')

  return <div>
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
            setToken(json.token)
          }
        } catch (error) {
          console.log(error)
        }
      }}>
        {'Login'}
      </button>
    </p>
    <p>{token}</p>
  </div>
}

export default Home
