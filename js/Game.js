class GameState {
  constructor() {
    this.code = new Code();
    this.attemptIndex = 0;
  }
}

class Game {
  constructor() {
    this.state = new GameState();
    this.scoreController = new ScoreController();
    this.sceneController = new SceneController();
    this.optionController = new OptionController();
    this.messageController = new MessageController();

    this.init();
  }

  end(isWin) {
    this.sceneController.showCode();

    this.messageController.show();

    if (isWin) {
      this.messageController.showWonMessage();
    } else {
      this.messageController.showLostMessage();
    }
  }

  step() {
    const nextAttemptIndex = this.state.attemptIndex + 1;

    const attempt = this.sceneController.getCurrentAttempt();
    const isCodeBroken = getIsCodeBrokenByAttempt(this.state.code, attempt);
    const colorScores = getColorScores(this.state.code, attempt);

    this.scoreController.acceptColorScoresForCurrentAttempt(colorScores);

    if (isCodeBroken || nextAttemptIndex === MAX_ATTEMPTS) {
      this.end(isCodeBroken);
    } else {
      this.state.attemptIndex = nextAttemptIndex;

      this.sceneController.acceptAttemptIndex(nextAttemptIndex);
      this.sceneController.trySelectNext();

      this.scoreController.acceptAttemptIndex(nextAttemptIndex);
    }
  }

  // Handlers
  /**
   * @param {typeof COLORS[number]} color
   */
  handleColorChoosen(color) {
    const accepted = this.sceneController.acceptColorForSelection(color);

    if (!accepted) return;

    const couldSelectNext = this.sceneController.trySelectNext();

    if (!couldSelectNext) {
      this.step();
    }
  }

  // Init / Reset
  init() {
    this.sceneController.acceptCode(this.state.code);
    this.sceneController.acceptAttemptIndex(this.state.attemptIndex);
    this.sceneController.trySelectNext();

    this.scoreController.acceptAttemptIndex(this.state.attemptIndex);

    this.optionController.onColorChoosen = (color) =>
      this.handleColorChoosen(color);
  }

  reset() {
    this.state = new GameState();

    this.scoreController.reset();
    this.sceneController.reset();
    this.optionController.reset();

    this.sceneController.acceptCode(this.state.code);
    this.sceneController.acceptAttemptIndex(this.state.attemptIndex);
    this.sceneController.trySelectNext();

    this.scoreController.acceptAttemptIndex(this.state.attemptIndex);

    this.messageController.reset();
  }
}
