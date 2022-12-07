/**
 * @param {Code} code
 * @param {Attempt} attempt
 * @returns {boolean}
 */
function getIsCodeBrokenByAttempt(code, attempt) {
  return code.values.every((value, index) => value === attempt.values[index]);
}

/**
 * @param {Code} code
 * @param {Attempt} attempt
 * @returns {typeof COLORS[number][]}
 */
function getColorScores(code, attempt) {
  const colorScores = [];

  /** @type {{[key: string]: {count: number, positions: number[]}}} */
  const codeInfoMap = {};

  code.values.forEach((value, index) => {
    if (!codeInfoMap[value]) {
      codeInfoMap[value] = {
        count: 0,
        positions: [],
      };
    }

    codeInfoMap[value].count++;
    codeInfoMap[value].positions.push(index);
  });

  attempt.values.forEach((attemptValue, attemptValueIndex) => {
    const codeInfo = codeInfoMap[attemptValue];

    const hasColorMatchingLeft = codeInfo && codeInfo.count !== 0;
    const isPositionMatching =
      codeInfo && codeInfo.positions.includes(attemptValueIndex);

    if (hasColorMatchingLeft && isPositionMatching) {
      codeInfo.count--;
      codeInfo.positions.splice(
        codeInfo.positions.indexOf(attemptValueIndex),
        1
      );

      colorScores.push("white");
    } else if (hasColorMatchingLeft) {
      codeInfo.count--;
      colorScores.push("black");
    } else {
      colorScores.push("");
    }
  });

  return colorScores.sort(() => (Math.random() > 0.5 ? 1 : -1));
}
