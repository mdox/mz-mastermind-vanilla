class Code {
  constructor() {
    /** @type {typeof COLORS[number][]} */
    this.values = Array.from(
      { length: 4 },
      () => COLORS[((Math.random() * COLORS.length) | 0) % COLORS.length]
    );
  }

  get infoMap() {
    /** @type {{[color: string]: { recurrence: number, positions: number[] }}} */
    const infoMap = {};

    this.values.forEach((value, index) => {
      if (!infoMap[value]) {
        infoMap[value] = {
          recurrence: 0,
          positions: [],
        };
      }

      infoMap[value].recurrence++;
      infoMap[value].positions.push(index);
    });

    return infoMap;
  }
}
