# React JWT study

* [Frontend](./frontend/README.md)
  * [mkachi-react-typescript-template](https://github.com/MKachi/mkachi-react-typescript-template)
  * react-cookie
* [Backend](./backend/README.md)
  * express
  * cors
  * cookie-parser
  * express
  * jsonwebtoken

## JWT(JSON Web Token)

`JWT`는 `Client To Server`, `Service To Service`를 위한 `Authorization`을 위한 웹 표준([RFC 7519](https://tools.ietf.org/html/rfc7519)) 이다.

### 구조

`JWT`는 `UTF8`로 입력한 `Header`, `Payload`, `Signature`를 `Base64Url`로 인코딩을 한 뒤  `.`으로 구분한 문자열이다.

> Base64Url(Header).Base64Url(Payload).Base64Url(Signature)

#### Header(JOSE Header)

```json
{
    "typ": "JWT",
    "alg": "HS256"
}
```

`Header`에는 `JWT`를 검증하는데 필요한 정보를 가지고 있다.

* **typ** : `Token`의 타입
* **alg** : 서명에 사용된 암호화 알고리즘

#### Payload(JWT Claim Set)

```json
{
    "name": "히오스",			// 사용자 정의
    "dest": "이게...시공...?", // 사용자 정의
    "iss": "issuer",
    "sub": "subject",
    "aud": "audience",
    "exp": "expiration time",
    "nbf": "not before",
    "iat": "issued at",
    "jti": "jwt id"
}
```

`Payload`에는 `token`의 정보를 담기 위한 클레임들이 있다.  
`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`와 같은 클레임들은 `Token`에서 필요한 정보들을 담기 위해서 예약된 클레임들이다.  
예약된 클레임들은 선택적으로 사용하면 된다.

* **iss** : 발급자
* **sub** : 제목
* **aud** : 대상자
* **exp** : 만료 시간
* **nbf** : 활성화 시간, 이 날짜가 지난후로부터 `token`을 사용할 수 있다.
* **iat** : 발급된 시간
* **jti** : 해당 `token`의 고유 식별자

위와 같이 예약된 클레임들 말고도 사용자가 필요한 데이터를 정의할 수도 있다.

#### Signature

```js
hash(
  secretKey,
  base64Url(header) + '.' + base64Url(payload)
)
```

`Signature`는 해당 `Token`이 믿을 수 있는 `Token`인지 검증할 수 있는 값이다.  
`Base64Url`로 인코딩된 `Header`와 `Payload`를 `.`으로 구분한 값을 `Header`의 `alg`에 명시한 알고리즘으로 암호화 해준다. 

`Token`이 안전한지 확인하려면 `Signature`값을 복호화 하여 정상적인 값인지 체크하면 된다.

### Token을 전달

일반적으로는 `Bearer` schema의 `Authorization` `Header`안에 넣어 사용을 하거나 `Cookie`값으로 사용을 한다.

> Authorization: Bearer [token]...

서버에서는 `Token`이나 유저를 구분하기 위한 특정 상태를 가지고 있을 필요가 없어 서버를 `stateless`하게 유지할 수 있다.
기존에 `Session` 데이터를 서버가 들고 있는 것과는 달리 `Token`은 사용자의 클라이언트에서 가지고 있게 되므로 탈취당할 수 있는 위험이 있다.

### Token을 검증하는 방법

`Client`로부터 받은 `Token`값을 기준으로 `Signature`값을 새롭게 생성하여 전달받은 `Signature`값과 동일한지 비교한다.