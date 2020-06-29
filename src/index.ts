import express from 'express';
import Ahorcado from './models/Ahorcado';

const app = express();
const port = process.env.PORT || 3000;

const gameMap: { [key: string]: Ahorcado } = {};

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.post('/:nick', (req, res) => {
  if (gameMap[req.params.nick]) {
    res.send({ error: 'Name already taken' });
  } else {
    const game = new Ahorcado();
    game.setNick(req.params.nick);
    gameMap[req.params.nick] = game;
    res.send({ nick: req.params.nick });
  }
});

app.post('/:nick/start', (req, res) => {
  gameMap[req.params.nick].setRandomWord();
  res.send(gameMap[req.params.nick].getState());
});

app.post('/:nick/guess/:letter', (req, res) => {
  gameMap[req.params.nick].tryLetter(req.params.letter);
  res.send(gameMap[req.params.nick].getState());
});

app.post('/:nick/guessword/:word', (req, res) => {
  gameMap[req.params.nick].tryWord(req.params.word);
  res.send(gameMap[req.params.nick].getState());
});

app.post('/:nick/reset', (req, res) => {
  gameMap[req.params.nick].reset();
  res.send(gameMap[req.params.nick].getState());
});

app.get('/:nick', (req, res) =>
  res.send(
    gameMap[req.params.nick]
      ? gameMap[req.params.nick].getState()
      : { error: "Nick doesn't exist" },
  ),
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
