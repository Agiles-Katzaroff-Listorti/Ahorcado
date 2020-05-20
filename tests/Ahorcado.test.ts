import Ahorcado from '../src/Ahorcado';

function getNewGame() {
  return new Ahorcado();
}

test('Entrar sin login', () => {
  const juego = getNewGame();
  juego.loginSimple('Juan el vicio');
  expect(juego.nick).toBe('Juan el vicio');
});

test('Elegir palabra', () => {
  const juego = getNewGame();
  juego.setRandomWord();
  expect(juego.palabra).toBe('fibonacci');
});

test('Errar 6 letras', () => {
  const juego = getNewGame();
  juego.loginSimple('Pepe');
  juego.setRandomWord();
  juego.tryLetter('e');
  juego.tryLetter('e');
  juego.tryLetter('e');
  juego.tryLetter('e');
  juego.tryLetter('e');
  juego.tryLetter('e');
  expect(juego.getState().perdio).toBe(true);
});

test('Acertar todas', () => {
  const juego = getNewGame();
  juego.loginSimple('Pepe');
  juego.setRandomWord();
  juego.tryLetter('f');
  juego.tryLetter('i');
  juego.tryLetter('b');
  juego.tryLetter('o');
  juego.tryLetter('n');
  juego.tryLetter('a');
  juego.tryLetter('c');
  juego.tryLetter('c');
  juego.tryLetter('i');
  expect(juego.getState().gano).toBe(true);
});
