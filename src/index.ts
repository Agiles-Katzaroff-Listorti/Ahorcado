import express from 'express'
import Ahorcado from './models/Ahorcado';

const app = express()
const port = process.env.PORT || 3000

const gameMap: { [key: string]: Ahorcado } = {}

app.post('/:nick', (req, res) => {
    if (gameMap[req.params.nick]) { res.send("Name already taken") }
    else {
        const game = new Ahorcado();
        game.setNick(req.params.nick);
        gameMap[req.params.nick] = game;
        res.send("Nick set: " + req.params.nick)
    }
})

app.post('/:nick/start', (req, res) => {
    gameMap[req.params.nick].setRandomWord();
    res.send(gameMap[req.params.nick].getState())
})

app.post('/:nick/guess/:letter', (req, res) => {
    gameMap[req.params.nick].tryLetter(req.params.letter);
    res.send(gameMap[req.params.nick].getState())
})

app.post('/:nick/guessWord/:word', (req, res) => {
    gameMap[req.params.nick].tryWord(req.params.word);
    res.send(gameMap[req.params.nick].getState())
})

app.post('/:nick/reset', (req, res) => {
    gameMap[req.params.nick].reset();
    res.send(gameMap[req.params.nick].getState())
})

app.get('/:nick', (req, res) => res.send(gameMap[req.params.nick] ? gameMap[req.params.nick].getState() : "Nick doesn't exist"))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))