# Express MongoDB example
https://project-tech-2021.herokuapp.com/login live version
![screenshot gif of app](https://github.com/deannabosschert/express-mongodb-example/blob/main/public/assets/img/screencapture_website.gif)



<details>
  <summary><strong>Table of Contents</strong> (click to expand)</summary>

<!-- toc -->

- [✅ To-do](#--to-do)
- [📋 Concept](#---concept)
- [⚙️ Installation](#---installation)
- [🗃 Data](#---data)
  * [💽 Data cleaning](#---data-cleaning)
- [👯🏿‍ Features (+ wishlist)](#------features----wishlist-)
- [🗺️ License](#----license)

<!-- tocstop -->

</details>

## ✅ To-do
- [x] Add password hashing

## 📋 Concept
User can register for an account, login with it, logout or delete it.


## ⚙️ Installation
Clone this repository to your own device:
```bash
$ git clone https://github.com/deannabosschert/express-mongodb-example.git
```
Then, navigate to this folder and run:

```bash
npm install
```

Last,

```bash
npm run dev
```

#### Environment variables
After creating your own database, link it by creating a .env with the following:

```json
PORT=3000
DB_NAME="${yourdatabasename}"
C_NAME=${yourcollection}
DB_URL=${yourdburl}
SESSION_SECRET=1

```

example: 
```json
PORT=3000
DB_NAME="matching-app"
C_NAME=users
DB_URmongodb+srv://techkech:password123@matching-app.zzw70.gcp.mongodb.net/test?retryWrites=true&w=majority
SESSION_SECRET=1

```

#### Dependencies

<details>
  <summary>Dependencies (click to expand)</summary>
```json
 "devDependencies": {
    "cross-env": "^7.0.2",
    "node-sass": "^4.14.1",
    "node-sass-glob-importer": "^5.3.2",
    "nodemon": "^2.0.2",
    "npm-run-all": "^4.1.5"
  },
  "dependencies": {
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.0",
    "connect-mongodb-session": "^2.4.1",
    "dotenv": "^8.2.0",
    "ejs": "^3.0.1",
    "express": "^4.17.1",
    "express-liquid": "^0.2.6",
    "express-session": "^1.17.1",
    "fs": "^0.0.1-security",
    "gyp": "^0.5.0",
    "heroku": "^7.2.0",
    "liquidjs": "^9.25.0",
    "mongodb": "^3.6.6",
    "mongoose": "^5.9.10",
    "multer": "^1.4.2",
    "node-fetch": "^2.6.0",
    "node-gyp": "^3.8.0",
    "rebuild": "^0.1.2"
  }
```
</details>


## 🗃 Data
### 💽 Data cleaning
The passwords of the user are hashed before being stored in the database.
```js
    const user = {
              username: req.body.userSignup,
              email: req.body.emailSignup.toLowerCase(),
              hash: req.body.passwordSignup,
              description: '',
              age: '',
              location: '',
              avatar: ''
            }
```

outcome:
```json
    const user = {
              username: req.body.userSignup,
              email: req.body.emailSignup.toLowerCase(),
              hash: hash,
              description: '',
              age: '',
              location: '',
              avatar: ''
            }
```

## 👯🏿‍ Features (+ wishlist)
_What would you like to add (feature wishlist / backlog)?_ 

- [x] Register user
- [x] Login user
- [x] Logout user
- [x] Render profile
- [x] Remove profile
- [x] Hash passwords
- [ ] Fetch ColorAPI-data
- [ ] Match with other users based on complementary colors


## 🗺️ License

Authors: 
- [Deanna Bosschert](https://github.com/deannabosschert)


License by
[MIT](https://github.com/deannabosschert/Matcher/blob/master/LICENSE)

