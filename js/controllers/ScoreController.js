class ScoreController {
  constructor() {
    this.attemptIndex = 0;
    this.scoreBoxDOMs = getScoreBoardBoxDOMs();

    this.init();
  }

  /**
   * @param {typeof COLORS[number][]} colorScores
   */
  acceptColorScoresForCurrentAttempt(colorScores) {
    const scorePegDOMs = getScoreBoardBoxPegDOMs(this.attemptIndex);

    scorePegDOMs.forEach((scorePegDOM, index) => {
      setPegDOMColor(scorePegDOM, colorScores[index]);
    });
  }

  /**
   * @param {number} attemptIndex
   */
  acceptAttemptIndex(attemptIndex) {
    this.attemptIndex = attemptIndex;

    this.scoreBoxDOMs.forEach((scoreBoxDOM) => {
      const scoreBoxIndex = getDOMDatasetIndex(scoreBoxDOM);
      const scorePegDOMs = getScoreBoardBoxPegDOMs(scoreBoxIndex);

      scorePegDOMs.forEach((scorePegDOM) => {
        setPegDOMIsDisabled(scorePegDOM, !(attemptIndex >= scoreBoxIndex));
      });
    });
  }

  // Init / Reset
  init() {
    this.scoreBoxDOMs.forEach((scoreBoxDOM) => {
      const scoreBoxIndex = getDOMDatasetIndex(scoreBoxDOM);
      const scorePegDOMs = getScoreBoardBoxPegDOMs(scoreBoxIndex);

      scorePegDOMs.forEach((scorePegDOM) => {
        setPegDOMIsDisabled(scorePegDOM, true);
      });
    });
  }

  reset() {
    this.scoreBoxDOMs.forEach((scoreBoxDOM) => {
      const scoreBoxIndex = getDOMDatasetIndex(scoreBoxDOM);
      const scorePegDOMs = getScoreBoardBoxPegDOMs(scoreBoxIndex);

      scorePegDOMs.forEach((scorePegDOM) => {
        setPegDOMIsDisabled(scorePegDOM, true);
        setPegDOMColor(scorePegDOM, undefined);
      });
    });
  }
}
