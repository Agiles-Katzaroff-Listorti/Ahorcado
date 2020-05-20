import Ahorcado from './Ahorcado';

const juego = new Ahorcado();
juego.loginSimple('Herno');
juego.setRandomWord();

console.log('Letra a');
juego.tryLetter('a');
console.log(juego.getState());
console.log('Letra c');
juego.tryLetter('c');
console.log(juego.getState());
console.log('Letra e');
juego.tryLetter('e');
console.log(juego.getState());
