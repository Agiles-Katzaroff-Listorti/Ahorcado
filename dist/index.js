"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ahorcado_1 = require("./Ahorcado");
const juego = new Ahorcado_1.default();
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
//# sourceMappingURL=index.js.map