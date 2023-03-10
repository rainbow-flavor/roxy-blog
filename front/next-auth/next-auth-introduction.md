---
id: next-auth-introduction
title: ๐ป NextAuth Introduction
authors: Hank
tags: [Hank, Next.js, Next-auth, Authorization,]
keywords:
- Next-auth
- next.js
- ํด๋ผ์ด์ธํธ ์ธ์ฆ
- JWT
---

# ๐ป NextAuth Introduction
NextAuth์๋ ์ด๋ค ๊ธฐ๋ฅ์ด ์์ผ๋ฉฐ ์ ์ฌ์ฉํ๋์ง, ์ธ์ฆ ๋ฐฉ์ ์ค์ ์ ์ค๋ช๋๋ฆฌ๊ณ ์ ํฉ๋๋ค.

## ๐ Why NextAuth??
### ๋น๋ฐ๋ฒํธ ์๋ ๋ก๊ทธ์ธ
Next.js๋ Serverless๋ฅผ ์ง์ํ๋๋ก ์ฒ์๋ถํฐ ์ค๊ณ๋์์ต๋๋ค. ๋ชจ๋  OAuth ์๋น์ค์ ๋๊ธฐํํ๋๋ก ์ค๊ณ๋์์ผ๋ฉฐ ๋ฐ์ดํฐํฐ๋ฒ ์ด์ค ์ ๋ฌด์ ๊ด๊ณ์์ด ์ฌ์ฉํ  ์ ์์ผ๋ฉฐ MySQL, MongoDB, PostgreSQL ๋ฐ MariaDB์ ๊ฐ์ ์ธ๊ธฐ ์๋ ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ๋ํ ๊ธฐ๋ณธ ์ง์์ด ์์ต๋๋ค. ๋ฐ์ดํฐ๋ฒ ์ด์ค๋ก ์ธ์ ์ ์ง๋ฅผ ํ๊ฑฐ๋ JWT๋ก ์ธ์ฆํ๋ ๋ฐฉ๋ฒ ๋๋ค ์ง์ํฉ๋๋ค.
### ์ฌ์ด ๊ฐ๋ฐ
20์ค์ด๋ฉด ์ธ์ฆ๊ณผ์ ๋ถํฐ ์ฌ์ฉ์์ ์ ๋ณด๋ฅผ React-hooks๋ก ์ฌ์ฉํ  ์ ์์ต๋๋ค. 

SessionProvider์ Context๋ฅผ ํตํด ํ์ ์ปดํฌ๋ํธ์์ ์ ๊ทผํ ์๋ ์์ต๋๋ค.
### ๋ณด์ ์ ๊ณต
๊ธฐ๋ณธ์ ์ผ๋ก ์ฌ์ฉ์์ ๋ฐ์ดํฐ๋ฅผ ๋ณดํธํ๊ธฐ ์ํด ๋ฏผ๊ฐํ ์ ๋ณด๋ ์ ์ฅํ์ง ์๋๋ก ์ค๊ณ๋์ด ์์ต๋๋ค.

๋ํ ๋ก๊ทธ์ธ๊ณผ ๋ก๊ทธ์์ ์์ฒญ ์์๋ ๋ด๋ถ์์ CSRF ํ ํฐ์ ํ์ฉํด ์ฌ์ฉ์์ ์์ฒญ์ ๊ฒ์ฆํฉ๋๋ค.

:::info CSRF (Cross Site Request Forgery : ํฌ๋ก์ค ์ฌ์ดํธ ์์ฒญ ์์กฐ)
CSRF๋ ์ฌ์ฉ์์ ์ปดํจํฐ์ ํน์  ๋๋ฉ์ธ์ ๋ํ ์ธ์ ์ฟ ํค๋ JWT๊ฐ ์ ์ฅ๋์ด์์ ๋ ๊ณต๊ฒฉ์ ๋นํด ์์ ์ ์์ฌ์ ์๊ด์์ด ๋๋ฉ์ธ์์ ๊ณ์ข์ด์ฒด๋ฅผ ํ๊ฑฐ๋ ๋ธ๋ก๊ทธ์ ๊ธ์ ์ฌ๋ฆฌ๊ฒ ๋๋ ๋ฑ์ ๊ณต๊ฒฉ์ ์ด์ผ๊ธฐํฉ๋๋ค.
CSRF ํ ํฐ์ ์ด๋ฅผ ์ํด ๊ตฌํ๋์์ต๋๋ค. 

์ฌ์ฉ์์ ๋งค ์์ฒญ๋ง๋ค ์์์ ๋์๊ฐ์ ์ฃผ๋๋ฐ ํ์ทจ๋ ์ธ์์ด๋๋ผ๋ CSRF ํ ํฐ์ด ์ด์ ์ ์ด๋ฏธ ์๋ฃ๋ ์์ฒญ์ ํ ํฐ์ด๋ผ๋ฉด ๊ทธ ํด๋น ์ธ์์ ๋ชจ๋ ์ ์ง์ํค๋ ๋ฐฉ์์๋๋ค.
:::
## ๐ Configuration
### providers
```ts title=pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         allowDangerousEmailAccountLinking: true,
      })
   ]
})
```

provider๋ OAuth๋ Custom ๋ฑ๋ฑ ์ด๋ป๊ฒ ์ธ์ฆ์ ํ ์ง ๋ฐฉ์์ ์ ์ํ๋ ์ต์์๋๋ค. 

Provider์ ์ฃผ์ฒด๊ฐ ์ด๋ค ๊ฒ์ด ๋ ์ง ์ ํ  ์ ์์ต๋๋ค. ๊ธฐ๋ณธ์ ์ผ๋ก `NextAuth`์์๋ OAuth, email, credentials ๋ฐฉ์์ ์ง์ํฉ๋๋ค.

![img.png](img.png)

์๋ฅผ ๋ค์ด ๊ตฌ๊ธ OAuth ์ธ์ฆ ํ session ์ ๋ณด๋ฅผ ๋ณด๋ฉด ํด๋น ๋ฆฌ์คํฐ์ค๊ฐ ๋ด๊ธด ๊ฒ์ ํ์ธํ  ์ ์์ต๋๋ค.

ํด๋น ์ ๋ณด๋ SessionProvider์ context์ ์ฃผ์๋  ๊ฒ์๋๋ค.

### CredentialsProvider

๋ณดํต์ OAuth๋ฅผ ํ์ฉํ์ฌ ๋น ๋ฅด๊ฒ ์ธ์ฆ์ ๊ตฌํํ์ง๋ง DB์์ ์ธ์์ ๊ด๋ฆฌํ๋ค๋๊ฐ ๋ค๋ฅธ ์ดํ๋ฆฌ์ผ์ด์์์ ๊ตฌ์ถํด ์ปค์คํํ  ๋๋ Credentials Provider๋ฅผ ํ์ฉํฉ๋๋ค.

```ts title=pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export default NextAuth({
   providers: [
      CredentialsProvider({
        ...
      })
   ]
})
```
OAuth, Email์ ๊ฒฝ์ฐ์๋ ์ธ์ฆ ํ ์น๋ค์ง๋ Response๋ฅผ ํด๋น ์ดํ๋ฆฌ์ผ์ด์์์ ์ฃผ์ง๋ง Credentials์ ๊ฒฝ์ฐ์๋ ์ธ์ฆ ์ฑ๊ณตํ ๋ฆฌ์คํฐ์ค๋ฅผ ํด๋น ๋๋ฉ์ธ์์ ์ค ์ ์์ต๋๋ค.

|    Name     |                    Description                    |                 Type                  | Required |
| :---------: | :-----------------------------------------------: | :-----------------------------------: | :------: |
|     id      |            Unique ID for the provider             |               `string`                |   Yes    |
|    name     |         Descriptive name for the provider         |               `string`                |   Yes    |
|    type     |   Type of provider, in this case `credentials`    |            `"credentials"`            |   Yes    |
| credentials |          The credentials to sign-in with          |               `Object`                |   Yes    |
|  authorize  | Callback to execute once user is to be authorized | `(credentials, req) => Promise<User>` |   Yes    |

```ts title=pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

interface CredentialInput { // credential์ ํค ํ์
    label?: string;
    type?: string;
    value?: string;
    placeholder?: string;
}

export default NextAuth({
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" },
         },
         ...
      })
   ]
})
```

`credentials` ์ต์์ Next-auth์์ ์ธ์ฆ์ ํ๋ ์์์ ์ ํฉ๋๋ค. ์ฐ๋ฆฌ๊ฐ ์ธ์ฆ์ ํด์ฃผ๊ธฐ ์ํด์ ํ์ํ ๊ฐ๋ค์ ๋ฐ๊ฒ ํ๊ณ  ์ฃผ์ง ์๋๋ค๋ฉด NextAuth ์์ฒด์ ์ผ๋ก ์๋ฌ๋ฅผ ๋์ ธ์ค๋๋ค. 

credentials์ ํค๋ค์ด CredentialInput ํ์์ธ ์ด์ ๋ NextAuth ์์ฒด์ ์ผ๋ก ๋ก๊ทธ์ธ ํ์ด์ง๋ฅผ ๋ง๋ค์ด์ฃผ๊ธฐ ๋๋ฌธ์ธ๋ฐ์. ๋ฐ๋ก ์ถ๊ฐํ์ง ์๋๋ค๋ฉด ๋ด์ฅ๋ ์กฐ๊ฑด๋ค๋ก ํ์๋  ๊ฒ์๋๋ค.

```typescript
import { signIn, signOut } from 'next-auth/react'

const login = async () => {
    await signIn("credentials", {
       username: "Hank",
       password: "12345678"
    });
}
```
์ด์  next-auth์ signIn ํจ์๋ฅผ ํธ์ถํด ์ฐ๋ฆฌ๊ฐ ์ ํด๋ ์์์ ์๋ ฅํ๋ฉด ์ธ์ฆ์ด ์งํ๋ฉ๋๋ค. ๋ถ๊ฐ์ ์ผ๋ก ์ธ์ฆ์ด ์ฑ๊ณตํ๋ฉด redirect๋ฅผ ํ ์ง ๋ฑ๋ฑ ์ต์๋ ๋ฃ์ ์ ์์ต๋๋ค.

```ts title=pages/api/auth/[...nextauth].ts
export default NextAuth({
   providers: [
      CredentialsProvider({
         ...,
         async authorize(credentials, req) {
            const res = await fetch("/your/endpoint", {
               method: "POST",
               body: JSON.stringify(credentials),
               headers: { "Content-Type": "application/json" },
            });
            const user = await res.json();

            if (res.ok && user) {
               return user;
            }

            return null;
         },
      })
   ]
})
```

์ด์  SignIn ๋ฉ์๋๊ฐ ํธ์ถ๋๋ฉด ์ฐ๋ฆฌ๋ `authorize` ํจ์์์ session์ ์ด๋ค ์ ๋ณด๋ฅผ ๋ด์์ง ๋ก์ง์ ๋ด์์ค ์ ์์ต๋๋ค. ํด๋น ์ฝ๋ฐฑ์์ DB์ user ์ ๋ณด๋ฅผ ์กฐํํ๊ฑฐ๋ ๋ฐฑ์๋ ์๋ฒ์์ access token์ ๋ฐ์์ค๋ ๋ฑ์ ์กฐ์น๋ฅผ ์ทจํ  ์ ์์ต๋๋ค.


```bash title=authorizeํจ์์_์ธ์์ธ_credentials
[Object: null prototype] {
    username: '...',
    callbackUrl: '/',
    csrfToken: '...',
    json: 'true'
}
```

์ธ์๊ฐ์ผ๋ก ๋ค์ด์ค๋ credentials์๋ next-auth๊ฐ signIn์์ ๋ฐ์์จ ํค ๊ฐ๋ค๊ณผ ์์ฒด๋ก ์์ฐํ csrf ํ ํฐ์ด ๊ฐ์ด ๋ค์ด์์ต๋๋ค.

### Secret & Debug
```ts title=pages/api/auth/[...nextauth].ts
export default NextAuth({
   providers: [ CredentialsProvider({...})],
   secret: process.env.AUTH_SECRET,
   debug: process.env.NODE_ENV === 'development',
})
```

secret์ ๋ค์ด๊ฐ๋ ์์ ๋ฌธ์์ด์ ํ ํฐ์ ํด์ํ๊ณ  ์ฟ ํค๋ฅผ ์๋ช/์ํธํํ๋ฉฐ ์ํธํ ํค๋ฅผ ์์ฑํ๋ ๋ฐ ์ฌ์ฉ๋ฉ๋๋ค. ๋ํ ์ธ์ฆ๊ณผ์ ์์ ์๋ฌ๊ฐ ๋  ๊ฒฝ์ฐ debug ์ต์์ด๋ logger ์ต์์ true๋ก ํ์ฌ ๋ฐํ์์์ ๋ฉ์ธ์ง๋ฅผ ํ์ธํ  ์ ์์ต๋๋ค.

:::tip secret ์ต์
```ts
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET
}));
```
express์์ ์ํธํํ๊ธฐ ์ํด ์ฐ์ด๋ ์ํฌ๋ฆฟ ์ฟ ํค์ ๋๊ฐ์ ์ญํ ์๋๋ค.
:::


### session & jwt
```ts title=pages/api/auth/[...nextauth].ts
export default NextAuth({
   session: {
      strategy: "database",
      maxAge: 30 * 24 * 60 * 60, // 30 days
   },
   jwt: {
      maxAge: 60 * 60
   },
   providers: [ CredentialsProvider({...})], 
   ...
})
```
- session :
   ์ฌ์ฉ์์ ์ธ์์ ์ด๋ป๊ฒ ๊ด๋ฆฌํ ์ง ์ฌ๋ฌ๊ฐ์ง ์ถ๊ฐ ์ต์์ด ์์ต๋๋ค. strategy์ ๊ธฐ๋ณธ๊ฐ์ ์ํธํ๋ JWT(JWE)๋ฅผ ์ธ์ ์ฟ ํค์ ์ ์ฅํ๋ ๋ฐฉ์์ธ โjwtโ์๋๋ค. maxAge๋ก ๋ง๋ฃ์๊ฐ๋ฑ์ ์ค์ ํ  ์ ์์ต๋๋ค.

- jwt : 
    session์ ์ ๋ต์ default๋ก ํ์ ์ ํ ํฐ์ ์ธ์ฝ๋ฉํ๋ ๊ณผ์ ์ ์๊ณ ๋ฆฌ์ฆ์ด๋ ๋ก์ง์ ์ถ๊ฐ์ ์ผ๋ก ์ค์ ํ  ์ ์์ต๋๋ค. maxAge์ ๊ฒฝ์ฐ ๊ธฐ๋ณธ๊ฐ์ด session์ maxAge๋ก ๋์ด์๊ธฐ ๋๋ฌธ์ ์ถ๊ฐ ๊ณ ๊ธ์ต์์ ์ฐ์ง ์์ ๊ฒฝ์ฐ ์ด ์ต์ ์์ฒด๋ฅผ ๋ฐ๋ก ์ธ ํ์๊ฐ ์์ต๋๋ค. 
   
### callback
```ts title=pages/api/auth/[...nextauth].ts
export default NextAuth({
    providers: [ CredentialsProvider({...})],
    callbacks: {
        async session({ session, token }) {
            if (session && session.user) {
                session = {
                    ...session,
                    user: { ...session.user, ...token }
                }
                return session
            }
            return session
        },
        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    ...token,
                    ...user
                }
            }
            return token
        }
    },
})

```
- session callback : 
   ์ฌ์ฉ์๊ฐ useSession์ด๋ getSession ๋ฑ ๊ธฐ์กด ์ ์ฅ๋ ์ธ์์ ๋ณด๋ฅผ ํ์ธํ๋ ค ํ  ๋ ํธ์ถ๋ฉ๋๋ค. next-auth๊ฐ authorizeํ ์ดํ๋ก ๋ณด์ ๊ฐํ๋ฅผ ์ํด ํ ํฐ์ ํ์ ์งํฉ๋ง ๋ฐํํ๊ธฐ ๋๋ฌธ์ ์ฌ๊ธฐ์ ๋ช์์ ์ผ๋ก ๋ด๋ ๊ณผ์ ์ด ํ์ํฉ๋๋ค.

- jwt callback :
JSON ์น ํ ํฐ์ด ์์ฑ๋๊ฑฐ๋(์ฆ, ๋ก๊ทธ์ธํ  ๋) ์๋ฐ์ดํธ๋  ๋๋ง๋ค(์ฆ, ํด๋ผ์ด์ธํธ์์ ์ธ์์ ์ก์ธ์คํ  ๋๋ง๋ค) ํธ์ถ๋ฉ๋๋ค. ๋ฐํ๋ ๊ฐ์ ์ํธํ ๋์ด ์ฟ ํค์ ์ ์ฅ๋ฉ๋๋ค.
์ธ์์ด ํ์ฑ์ํ์ผ ๋๋ง๋ค ํ ํฐ ๋ง๋ฃ ์๊ฐ์ด ์ฐ์ฅ๋ฉ๋๋ค. โ ๊ธฐ์กด ๋ก๊ทธ์์ํ์ง ์๊ณ  ๋ธ๋ผ์ฐ์  ๋๊ฐ์ ์ ์ฟ ํค์ ์ฌ์ด์ ธ์๋ค ๋ค์ ๋ค์ด์์ ๋ ์ธ์์ด ํ์ฑํ๋์ด ํ ํฐ ์๊ฐ์ด ์ฐ์ฅ๋ ๊ฒ์ ๋ณผ ์ ์์ต๋๋ค.

## ๐ Error case

[Frequently Asked Questions | NextAuth.js - What are the disadvantages of JSON Web Tokens?](https://next-auth.js.org/v3/faq)

:::caution NextAuth JWT ๊ฒฝ๊ณ ์ฌํญ
As with database session tokens, JSON Web Tokens are limited in the amount of data you can store in them. There is typically a limit of around 4096 bytes per cookie, though the exact limit varies between browsers, proxies and hosting services. If you want to support most browsers, then do not exceed 4096 bytes per cookie. If you want to save more data, you will need to persist your sessions in a database
:::

JSON ์น ํ ํฐ์๋ ์ ์ฅํ  ์ ์๋ ๋ฐ์ดํฐ ์์ด ์ ํ๋ฉ๋๋ค. ์ผ๋ฐ์ ์ผ๋ก ์ฟ ํค ์ฉ๋์ด 4096byte์ด๊ธฐ ๋๋ฌธ์ authorizeํ  ๋ ์ธ์์ ๋๋ฌด ๋ง์ ์ ๋ณด๋ฅผ ๋ด์ผ๋ฉด ์ธ์ฆ์์ฒด๊ฐ ์๋  ์ ์์ต๋๋ค. useSession์ ์ ์ฅํ  ์ ์  ๋ฐ์ดํฐ๊ฐ ํฌ๋ค๋ฉด NextAuth๊ฐ ์๋ ๋ค๋ฅธ ์ํ๊ด๋ฆฌ ๋ผ์ด๋ธ๋ฌ๋ฆฌ์์ ์ ์ฅํ  ๊ฒ์ ๊ถ์ฅ๋๋ฆฝ๋๋ค.



