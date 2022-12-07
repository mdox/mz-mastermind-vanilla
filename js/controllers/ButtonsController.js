class ButtonsController {
  constructor() {
    this.easyGameButtonDOM = getEasyGameButtonDOM();
    this.hardGameButtonDOM = getHardGameButtonDOM();
    this.restartGameButtonDOM = getRestartGameButtonDOM();
    this.onNewEasyGame = () => {};
    this.onNewHardGame = () => {};
    this.onRestartGame = () => {};

    this.init();
  }

  init() {
    this.easyGameButtonDOM.addEventListener("click", () =>
      this.onNewEasyGame()
    );

    this.hardGameButtonDOM.addEventListener("click", () =>
      this.onNewHardGame()
    );

    this.restartGameButtonDOM.addEventListener("click", () =>
      this.onRestartGame()
    );
  }
}
