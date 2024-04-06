const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let users = []

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', (req, res) => {
  let user = {
    username: req.body.username,
    _id: Date.now().toString(),
    log: []
  }
  users.push(user)
  res.json(user)
})

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.post('/api/users/:_id/exercises', (req, res) => {
  let user = users.find(u => u._id === req.params._id)
  if (user) {
    let exercise = {
      description: req.body.description,
      duration: parseInt(req.body.duration),
      date: req.body.date ? new Date(req.body.date).toDateString() : new Date().toDateString()
    }
    user.log.push(exercise)
    // Return the user object with the exercise fields added
    res.json({
      _id: user._id,
      username: user.username,
      date: exercise.date,
      duration: exercise.duration,
      description: exercise.description
    })
  } else {
    res.status(404).send('User not found')
  }
})


app.get('/api/users/:_id/logs', (req, res) => {
  let user = users.find(u => u._id === req.params._id)
  if (user) {
    let response = Object.assign({}, user)
    response.count = user.log.length

    // Handle from, to and limit parameters
    if (req.query.from || req.query.to) {
      let fromDate = new Date(req.query.from)
      let toDate = new Date(req.query.to)

      response.log = response.log.filter((session) => {
        let sessionDate = new Date(session.date)
        return sessionDate >= fromDate && sessionDate <= toDate
      })
    }

    if (req.query.limit) {
      response.log = response.log.slice(0, req.query.limit)
    }

    res.json(response)
  } else {
    res.status(404).send('User not found')
  }
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
