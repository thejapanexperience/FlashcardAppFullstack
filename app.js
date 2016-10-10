const PORT = 8000,
      cors = require('cors'),
      path = require('path'),
      morgan = require('morgan'),
      express = require('express'),
      webpack = require('webpack'),
      bodyParser = require('body-parser'),
      webpackConfig = require('./webpack.config'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware')

const Flashcards = require('./models/flashcardFunctions');

//Express invocation
const app = express()

//Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Webpack Configuration
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath, noInfo: true
}))
app.use(webpackHotMiddleware(compiler))

// ROUTES

app.get('/test', (req, res) => {
  res.send('Hiya buddy')
})

// GET Intro
app.get('/', (req, res) => {
  const obj = {
    message: "Welcome to Richard's Flashcard App",
  };
  res.send(obj.message);
});

// GET Flashcards
app.get('/flashcards', (req, res) => {
  Flashcards.getAll((err, flashcards) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.send(flashcards);
  });
});

// GET Flashcards by ID and RandomOne by Category
app.get('/flashcards/:id', (req, res) => {
  Flashcards.getOne(req.params.id,(err, one) => {
    if (err) return res.status(400).send({err})
    Flashcards.getAll((err, data) => {
      if (err) return res.status(400).send({err});
      res.send(data);
    })
  })
});

// PUT Flashcards by ID
app.put('/flashcards/:id', (req, res) => {
  // send to editOne what's in the first set of ()
  // recieve as callback what's in the second set of ()
  Flashcards.editOne(req.params.id, req.body, (err, one) => {
    if (err) return res.status(400).send({err})
    Flashcards.getAll((err, data) => {
      if (err) return res.status(400).send({err})
      console.log('data in app.put data: \n\n')
      res.send(data);
    })
  })
});

// DELETE Flashcards by ID
app.delete('/flashcards/:id', (req, res) => {
  Flashcards.deleteOne(req.params.id, (err) => {
    if (err) return res.status(400).send({err})
    Flashcards.getAll((err, data) => {
      if (err) return res.status(400).send({err});
      res.send(data);
    })
  })
});

// POST new Flashcards
app.post('/flashcards', (req, res) => {
  Flashcards.create(req.body, err => {
    if (err) return res.status(400).send(err);
    Flashcards.getAll((err, data) => {
      if (err) return res.status(400).send({err});
      res.send(data);
    })
  });
});

app.listen(PORT, err => {
  console.log( err || `Express listening on port ${8000}`)
})
