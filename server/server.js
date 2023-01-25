const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieSession = require("cookie-session")

mongoose.set('strictQuery', true)

const db = require("./models")
const Role = db.role
const dbConfig = require("./config/db.config")

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    initial();
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

// const tutorialRoute = require('./routes/tutorial.routes')

const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)

var corsOptions = {
  credentials: true,
  origin: ["http://localhost:8000", "http://localhost:4200"]
};

app.use(cors(corsOptions))

// var cacheOptions = {
//   setHeaders: function (res, path, stat) {
//     res.set('x-timestamp', Date.now()),
//     res.set('Cache-Control: max-age=31536000')
//   }
// }

// app.use(express.static('public', cacheOptions))

app.use(
  cookieSession({
    name: "session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

// Static directory path
app.use(express.static(path.join(__dirname, 'dist/server')))

// API root
// app.use('/api', tutorialRoute)

// Routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require("./routes/tutorial.routes")(app);

// PORT
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log('Listening on port ' + port)
})

// 404 Handler
app.use((req, res, next) => {
  next(createError(404))
})

// Base Route
app.get('/', (req, res) => {
  // res.send('invaild endpoint')
  res.json({ message: "Welcome to bastian-fischer.dev Homepage application." })
})

app.get('*', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'dist/server/index.html'),
  )
})

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})

// Roles
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// MongoDB Atlas
// dbAdmin
// CWdtsqi8E67GYJCS