import Ahorcado from '../src/models/Ahorcado';

function getNewGame() {
  return new Ahorcado();
}

test('Entrar sin login', () => {
  const juego = getNewGame();
  juego.setNick('Juan el vicio');
  expect(juego.nick).toBe('Juan el vicio');
});

test('Elegir palabra', () => {
  const juego = getNewGame();
  juego.setWord("fibonacci");
  expect(juego.palabra).toBe('fibonacci');
});

test('Errar 6 letras', () => {
  const juego = getNewGame();
  juego.setNick('Pepe');
  juego.setWord("fibonacci");
  juego.tryLetter('e');
  juego.tryLetter('e');
  juego.tryLetter('e');
  juego.tryLetter('e');
  juego.tryLetter('e');
  juego.tryLetter('e');
  expect(juego.getState().perdio).toBe(true);
});

test('Seguir tirando letras luego del juego perdido tiene que tirar error', () => {
  const juego = getNewGame();
  juego.setNick('Pepe');
  juego.setWord("fibonacci");
  juego.tryLetter('e');
  juego.tryLetter('e');
  juego.tryLetter('e');
  juego.tryLetter('e');
  juego.tryLetter('e');
  juego.tryLetter('e');
  expect(()=>juego.tryLetter('e')).toThrowError("Game already ended");
});

test('Seguir tirando letras luego del juego ganado tiene que tirar error', () => {
  const juego = getNewGame();
  juego.setNick('Pepe');
  juego.setWord("fibonacci");
  juego.tryLetter('f');
  juego.tryLetter('i');
  juego.tryLetter('b');
  juego.tryLetter('o');
  juego.tryLetter('n');
  juego.tryLetter('a');
  juego.tryLetter('c');
  expect(()=>juego.tryLetter('e')).toThrowError("Game already ended");
});

test('Acertar todas', () => {
  const juego = getNewGame();
  juego.setNick('Pepe');
  juego.setWord("fibonacci");
  juego.tryLetter('f');
  juego.tryLetter('i');
  juego.tryLetter('b');
  juego.tryLetter('o');
  juego.tryLetter('n');
  juego.tryLetter('a');
  juego.tryLetter('c');
  expect(juego.getState().gano).toBe(true);
});

test('Reset', () => {
  const juego = getNewGame();
  juego.setNick('Pepe');
  juego.setWord("fibonacci");
  juego.tryLetter('f');
  juego.tryLetter('i');
  juego.tryLetter('b');
  juego.tryLetter('o');
  juego.tryLetter('n');
  juego.tryLetter('a');
  juego.tryLetter('c');
  juego.reset();
  const state = juego.getState()
  expect(state.gano).toBe(false);
  expect(state.perdio).toBe(false);
})

test('Juego sin empezar', ()=>{
  const juego = getNewGame();
  juego.setNick("Pepe");
  expect(()=>juego.tryLetter('b')).toThrowError("Game not started");
})

test('Arriesgar palabra bien', ()=>{
  const juego = getNewGame();
  juego.setNick("Pepe");
  juego.setWord("fibonacci")
  juego.tryWord("fibonacci")
  expect(juego.getState().gano).toBe(true)
})

test('Arriesgar palabra mal', ()=>{
  const juego = getNewGame();
  juego.setNick("Pepe");
  juego.setWord("fibonacci")
  juego.tryWord("maradona")
  expect(juego.getState().perdio).toBe(true)
})