export class SymbolTable {

  constructor (length = 0) {
    this._symbolsToIndex = new Map();
    this._indexToSymbols = new Map();
    for (let i = 0; i < length; i++) {
      this.push(String.fromCharCode(i));
    }
  }

  get length () {
    return this._symbolsToIndex.size;
  }

  push (symbol) {
    const index = this.length;
    this._symbolsToIndex.set(symbol, index);
    this._indexToSymbols.set(index, symbol);
  }

  hasSymbol (symbol) {
    return this._symbolsToIndex.has(symbol);
  }

  getIndex (symbol) {
    return this._symbolsToIndex.get(symbol);
  }

  hasIndex (index) {
    return this._indexToSymbols.has(index);
  }

  getSymbol (index) {
    return this._indexToSymbols.get(index);
  }
}
