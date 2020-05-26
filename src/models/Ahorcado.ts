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

  private setPista() {
    this.pista = this.palabra.split("").map(c => "_").join("")
  }

  public setRandomWord() {
    const randomIndex = Math.round(Math.random() * (this.palabras.length - 1))
    this.palabra = this.palabras[randomIndex];
    this.setPista()
  }

  public setWord(word: string) {
    this.palabra = word.toLowerCase();
    this.setPista()
  }

  public tryLetter(letter: string) {
    letter = letter[0].toLowerCase()
    const indexes = this.palabra.split("").map((v, i) => ({ v, i })).filter(l => l.v === letter).map(l => l.i)
    if (indexes.length > 0) {
      this.pista = this.pista.split("").map((v, i) => indexes.includes(i) ? letter : v).join("")
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
