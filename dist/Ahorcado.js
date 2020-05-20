"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ahorcado {
    constructor() {
        this.gano = false;
        this.palabras = ['fibonacci']; //Dijo profesor que it's ok usar una sola para el primer sprint
        this.fallos = 0;
    }
    loginSimple(nick) {
        this.nick = nick;
    }
    getState() {
        return `${this.pista}
    Fallos: ${this.fallos}.
    Restantes: ${6 - this.fallos}`;
    }
    setRandomWord() {
        this.palabra = this.palabras[0];
        this.pista = '_________';
    }
    tryLetter(letter) {
        let index = this.palabra.indexOf(letter);
        if (index !== -1) {
            this.pista =
                this.pista.substring(0, index) +
                    letter +
                    this.pista.substring(index + 1);
            if (this.pista === this.palabra) {
                this.gano = true;
            }
        }
        else {
            this.fallos++;
            if (this.fallos === 6) {
                this.pista = this.palabra;
            }
        }
    }
}
exports.default = Ahorcado;
//# sourceMappingURL=Ahorcado.js.map