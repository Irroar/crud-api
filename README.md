# Users CRUD API in Node.JS with Horizontal scaling
  
### Requirements

- Nodejs v16.x
- npm v8.x

### Installation

1. Clone repository

```bash
git clone https://github.com/Irroar/crud-api.git
```

2. Go into project folder

```bash
cd crud-api
```

3. Install dependencies

```bash
npm install
```

4. Fill in .env

```js
PORT=***
```

### Command syntax

1. Run server with nodemon

```bash
npm run start:dev - Development mode
npm run start:prod - Production mode
npm run start:multi - Multi mode - horizontal scaling for application
npm run test - tests
```

### Endpoints

- API path `/user`:

  - **GET** `/user` or `/user/${userId}` return all users or user with corresponding `personId`
  - **POST** `/user` creates record about new user and store it in database
  - **PUT** `/user/${userId}` updates record about existing user
  - **DELETE** `/user/${userId}` deletes record about existing user from database

- Persons are stored as `objects` that have following properties:
  - `id` — unique identifier (`string`, `uuid`) generated on server side
  - `username` — person's name (`string`, **required**)
  - `age` — person's age (`number`, **required**)
  - `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)
