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
 * @returns {("white" | "black" | "")[]}
 */
function getColorScores(code, attempt) {
  const colorScores = [];

  const codeInfoMap = code.infoMap;

  attempt.values.forEach((attemptValue, attemptValueIndex) => {
    const codeInfo = codeInfoMap[attemptValue];

    const hasColorMatchingLeft = codeInfo && codeInfo.recurrence !== 0;
    const isPositionMatching =
      codeInfo && codeInfo.positions.includes(attemptValueIndex);

    if (hasColorMatchingLeft && isPositionMatching) {
      codeInfo.recurrence--;
      codeInfo.positions.splice(
        codeInfo.positions.indexOf(attemptValueIndex),
        1
      );

      colorScores.push("white");
    } else if (hasColorMatchingLeft) {
      codeInfo.recurrence--;
      colorScores.push("black");
    } else {
      colorScores.push("");
    }
  });

  return colorScores.sort(() => (Math.random() > 0.5 ? 1 : -1));
}
