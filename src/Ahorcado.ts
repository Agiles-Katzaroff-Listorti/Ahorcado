type Letter =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'ñ'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'Ñ'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

export default class Ahorcado {
  public nick: string;
  public palabra: string;
  public pista: string;
  public gano: boolean = false;
  private palabras: [string] = ['fibonacci']; //Dijo profesor que it's ok usar una sola para el primer sprint
  public fallos: number = 0;

  public loginSimple(nick: string) {
    this.nick = nick;
  }

  public getState() {
    return {
      pista: this.pista,
      fallos: this.fallos,
      gano: this.gano,
      perdio: this.fallos === 6,
    };
  }

  public setRandomWord() {
    this.palabra = this.palabras[0];
    this.pista = '_________';
  }

  public tryLetter(letter: Letter) {
    let index = this.palabra.indexOf(letter);
    if (index !== -1) {
      this.pista =
        this.pista.substring(0, index) +
        letter +
        this.pista.substring(index + 1);

      if (this.pista === this.palabra) {
        this.gano = true;
      }
    } else {
      this.fallos++;
      if (this.fallos === 6) {
        this.pista = this.palabra;
      }
    }
  }
}
