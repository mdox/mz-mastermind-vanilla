class GameState {
  constructor() {
    this.code = new Code();
    this.attemptIndex = 0;
  }
}

class Game {
  constructor() {
    this.state = new GameState();
    this.playerSettings = new PlayerSettings();
    this.buttonsController = new ButtonsController();
    this.scoreController = new ScoreController();
    this.sceneController = new SceneController();
    this.optionController = new OptionController();
    this.messageController = new MessageController();

    this.init();
  }

  newGame() {
    this.reset();
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

  /** @param {Attempt} attempt */
  showAttemptColorScores(attempt) {
    const colorScores = getColorScores(this.state.code, attempt);

    if (this.playerSettings.shuffleScores) {
      colorScores.sort(() => (Math.random() > 0.5 ? 1 : -1));
    }

    this.scoreController.acceptColorScoresForCurrentAttempt(colorScores);
  }

  step() {
    const nextAttemptIndex = this.state.attemptIndex + 1;

    const attempt = this.sceneController.getCurrentAttempt();

    this.showAttemptColorScores(attempt);

    const isCodeBroken = getIsCodeBrokenByAttempt(this.state.code, attempt);

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
  handleNewEasyGame() {
    this.playerSettings.shuffleScores = false;
    this.newGame();
  }

  handleNewHardGame() {
    this.playerSettings.shuffleScores = true;
    this.newGame();
  }

  handleRestartGame() {
    const restartIsConfirmedByInteraction = confirm(
      "Are you sure you want to restart?"
    );

    if (restartIsConfirmedByInteraction) {
      this.reset();
    }
  }

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

    this.buttonsController.onNewEasyGame = () => this.handleNewEasyGame();
    this.buttonsController.onNewHardGame = () => this.handleNewHardGame();
    this.buttonsController.onRestartGame = () => this.handleRestartGame();
  }

  reset() {
    this.state = new GameState();

    this.scoreController.reset();
    this.sceneController.reset();

    this.sceneController.acceptCode(this.state.code);
    this.sceneController.acceptAttemptIndex(this.state.attemptIndex);
    this.sceneController.trySelectNext();

    this.scoreController.acceptAttemptIndex(this.state.attemptIndex);

    this.messageController.reset();
  }
}
