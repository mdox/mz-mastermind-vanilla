class Code {
  constructor() {
    /** @type {typeof COLORS[number][]} */
    this.values = Array.from(
      { length: 4 },
      () => COLORS[((Math.random() * COLORS.length) | 0) % COLORS.length]
    );
  }
}
