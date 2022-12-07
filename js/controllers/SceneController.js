class SceneController {
  constructor() {
    this.attemptIndex = 0;
    this.attemptBoxDOMs = getSceneBoardAttemptBoxDOMs();
    this.codePegDOMs = getSceneBoardCodeBoxPegDOMs();

    this.init();
  }

  showCode() {
    this.codePegDOMs.forEach((codePegDOM) => {
      setCodePegDOMIsUnveiled(codePegDOM, true);
    });
  }

  tryDeselect() {
    const currSelectedAttemptPegDOM = this.getSelectedAttemptPegDOM();

    if (currSelectedAttemptPegDOM) {
      setPegDOMIsSelected(currSelectedAttemptPegDOM, false);
    }
  }

  /**
   * @param {number | undefined} attemptIndex
   * @param {boolean} isDisabled
   */
  setAttemptPegDOMsIsDisabled(attemptIndex, isDisabled) {
    if (attemptIndex === undefined) return;

    const attemptPegDOMs = getSceneBoardAttemptBoxPegDOMs(attemptIndex);

    attemptPegDOMs.forEach((attemptPegDOM) => {
      setPegDOMIsDisabled(attemptPegDOM, isDisabled);
    });
  }

  /**
   * @param {typeof COLORS[number]} color
   */
  acceptColorForSelection(color) {
    const currSelectedAttemptPegDOM = this.getSelectedAttemptPegDOM();

    if (!currSelectedAttemptPegDOM) return false;

    setPegDOMColor(currSelectedAttemptPegDOM, color);

    return true;
  }

  /**
   * @param {number | undefined} nextAttemptIndex
   */
  acceptAttemptIndex(nextAttemptIndex) {
    this.tryDeselect();

    this.setAttemptPegDOMsIsDisabled(this.attemptIndex, true);
    this.setAttemptPegDOMsIsDisabled(nextAttemptIndex, false);

    this.attemptIndex = nextAttemptIndex;
  }

  /**
   * @param {Code} code
   */
  acceptCode(code) {
    code.values.forEach((value, index) => {
      setPegDOMColor(this.codePegDOMs[index], value);
    });
  }

  trySelectNext() {
    if (this.attemptIndex === undefined) return false;

    const attemptPegDOMs = getSceneBoardAttemptBoxPegDOMs(this.attemptIndex);

    const nextAttemptPegDOMForSelection = attemptPegDOMs.find(
      (attemptPegDOM) => getPegDOMColor(attemptPegDOM) === ""
    );

    if (nextAttemptPegDOMForSelection) {
      this.tryDeselect();

      setPegDOMIsSelected(nextAttemptPegDOMForSelection, true);

      return true;
    }

    return false;
  }

  getCurrentAttemptBoxDOM() {
    return this.attemptBoxDOMs.find((attemptBoxDOM) => {
      const attemptBoxIndex = getDOMDatasetIndex(attemptBoxDOM);

      return attemptBoxIndex === this.attemptIndex;
    });
  }

  getCurrentAttempt() {
    const attempt = new Attempt();

    if (this.attemptIndex === undefined) return attempt;

    const attemptPegDOMs = getSceneBoardAttemptBoxPegDOMs(this.attemptIndex);

    attemptPegDOMs.forEach((attemptPegDOM, index) => {
      attempt.values[index] = getPegDOMColor(attemptPegDOM);
    });

    return attempt;
  }

  /**
   * @returns {HTMLElement | undefined}
   */
  getSelectedAttemptPegDOM() {
    if (this.attemptIndex === undefined) return undefined;

    const attemptPegDOMs = getSceneBoardAttemptBoxPegDOMs(this.attemptIndex);

    return attemptPegDOMs.find((attemptPegDOM) => {
      return getPegDOMIsSelected(attemptPegDOM);
    });
  }

  // Handlers
  /**
   * @param {HTMLElement} attemptPegDOM
   */
  handleClick(attemptPegDOM) {
    const currSelectedAttemptPegDOM = this.getSelectedAttemptPegDOM();

    if (currSelectedAttemptPegDOM) {
      setPegDOMIsSelected(currSelectedAttemptPegDOM, false);
    }

    if (attemptPegDOM !== currSelectedAttemptPegDOM) {
      setPegDOMIsSelected(attemptPegDOM, true);
    }
  }

  // Init / Reset

  init() {
    this.attemptBoxDOMs.forEach((attemptBoxDOM) => {
      const attemptBoxIndex = getDOMDatasetIndex(attemptBoxDOM);
      const attemptPegDOMs = getSceneBoardAttemptBoxPegDOMs(attemptBoxIndex);

      attemptPegDOMs.forEach((attemptPegDOM) => {
        setPegDOMIsDisabled(attemptPegDOM, true);

        attemptPegDOM.addEventListener("click", () => {
          this.handleClick(attemptPegDOM);
        });
      });
    });
  }

  reset() {
    this.attemptBoxDOMs.forEach((attemptBoxDOM) => {
      const attemptBoxIndex = getDOMDatasetIndex(attemptBoxDOM);
      const attemptPegDOMs = getSceneBoardAttemptBoxPegDOMs(attemptBoxIndex);

      attemptPegDOMs.forEach((attemptPegDOM) => {
        setPegDOMIsDisabled(attemptPegDOM, true);
        setPegDOMIsSelected(attemptPegDOM, false);
        setPegDOMColor(attemptPegDOM, undefined);
      });
    });

    this.codePegDOMs.forEach((codePegDOM) => {
      setCodePegDOMIsUnveiled(codePegDOM, false);
      setPegDOMColor(codePegDOM, undefined);
    });
  }
}
