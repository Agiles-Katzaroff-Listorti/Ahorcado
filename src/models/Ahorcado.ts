export default class Ahorcado {
  public nick: string;
  public palabra: string = null;
  public pista: string;
  private readonly palabras: string[] = [
    'fibonacci',
    'espejo',
    'celular',
    'ruta',
    'zapatilla',
    'oreja',
    'mortadela',
    'corrientes',
  ];
  private readonly maxFallos = 6;
  public fallos: number = 0;

  public juegosGanados: number = 0;
  public juegosTotales: number = 0;
  private palabrasUsadas: string[] = [];

  public setNick(nick: string) {
    this.nick = nick;
  }

  public reset() {
    this.fallos = 0;
    this.palabra = null;
    this.pista = null;
  }

  public tryWord(word: string) {
    if (word === this.palabra) {
      this.pista = this.palabra;
      this.juegosGanados = 0;
    } else {
      this.fallos = this.maxFallos;
    }
    this.juegosTotales++;
  }

  public getState() {
    let state: any = {
      pista: this.pista,
      fallos: this.fallos,
      gano: this.palabra !== null && this.pista === this.palabra,
      perdio: this.fallos === this.maxFallos,
      juegosGanados: this.juegosGanados,
      juegosTotales: this.juegosTotales,
    };
    if (state.gano || state.perdio) state.palabra = this.palabra;
    return state;
  }

  private setPista() {
    this.pista = this.palabra
      .split('')
      .map((c) => '_')
      .join('');
  }

  public setRandomWord() {
    this.reset();
    let palabrasNoUsadas = this.palabras.filter(
      (palabra) => !this.palabrasUsadas.includes(palabra),
    );
    if (palabrasNoUsadas.length === 0) {
      this.palabrasUsadas = [this.palabrasUsadas[this.palabrasUsadas.length]];
      palabrasNoUsadas = this.palabras.filter(
        (palabra) => !this.palabrasUsadas.includes(palabra),
      );
    }
    const randomIndex = Math.round(Math.random() * (this.palabras.length - 1));
    this.palabra = this.palabras[randomIndex];
    this.setPista();
  }

  public setWord(word: string) {
    this.reset();
    this.palabra = word.toLowerCase();
    this.setPista();
  }

  public tryLetter(letter: string) {
    if (!this.palabra) throw new Error('Game not started');
    letter = letter[0].toLowerCase();
    if (this.pista === this.palabra || this.fallos === this.maxFallos) {
      throw new Error('Game already ended');
    }
    const indexes = this.palabra
      .split('')
      .map((v, i) => ({ v, i }))
      .filter((l) => l.v === letter)
      .map((l) => l.i);
    if (indexes.length > 0) {
      this.pista = this.pista
        .split('')
        .map((v, i) => (indexes.includes(i) ? letter : v))
        .join('');
    } else {
      this.fallos++;
    }
    if (this.pista === this.palabra || this.fallos === this.maxFallos) {
      if (this.pista === this.palabra) this.juegosGanados=0;
      this.juegosTotales++;
      this.palabrasUsadas.push(this.palabra);
    }
  }
}
