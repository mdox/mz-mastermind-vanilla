class SceneController {
  constructor() {
    this.attemptBoxDOMs = getSceneBoardAttemptBoxDOMs();
    this.codePegDOMs = getSceneBoardCodeBoxPegDOMs();

    this.init();
  }

  showCode() {
    this.codePegDOMs.forEach((codePegDOM) => {
      setCodePegDOMIsUnveiled(codePegDOM, true);
    });
  }

  /**
   * @param {typeof COLORS[number]} color
   */
  acceptColorToSelection(color) {
    const currSelectedAttemptPegDOM = this.getSelectedAttemptPegDOM();

    if (!currSelectedAttemptPegDOM) return false;

    setPegDOMColor(currSelectedAttemptPegDOM, color);

    return true;
  }

  /**
   * @param {number | undefined} attemptIndex
   */
  acceptAttemptIndex(attemptIndex) {
    this.attemptBoxDOMs.forEach((attemptBoxDOM) => {
      const attemptBoxIndex = getDOMDatasetIndex(attemptBoxDOM);
      const attemptPegDOMs = getSceneBoardAttemptBoxPegDOMs(attemptBoxIndex);

      attemptPegDOMs.forEach((attemptPegDOM) => {
        setPegDOMIsDisabled(attemptPegDOM, attemptBoxIndex !== attemptIndex);
      });
    });
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
    const attemptBoxDOM = this.getCurrentAttemptBoxDOM();

    if (!attemptBoxDOM) return false;

    const attemptBoxIndex = getDOMDatasetIndex(attemptBoxDOM);
    const attemptPegDOMs = getSceneBoardAttemptBoxPegDOMs(attemptBoxIndex);

    const nextAttemptPegDOMForSelection = attemptPegDOMs.find(
      (attemptPegDOM) => {
        return getPegDOMColor(attemptPegDOM) === "";
      }
    );

    if (nextAttemptPegDOMForSelection) {
      const currSelectedAttemptPegDOM = this.getSelectedAttemptPegDOM();

      if (currSelectedAttemptPegDOM) {
        setPegDOMIsSelected(currSelectedAttemptPegDOM, false);
      }

      setPegDOMIsSelected(nextAttemptPegDOMForSelection, true);

      return true;
    }

    return false;
  }

  getCurrentAttemptBoxDOM() {
    return this.attemptBoxDOMs.find((attemptBoxDOM) => {
      const attemptBoxIndex = getDOMDatasetIndex(attemptBoxDOM);
      const attemptPegDOMs = getSceneBoardAttemptBoxPegDOMs(attemptBoxIndex);

      return !!attemptPegDOMs.find((attemptPegDOM) => {
        return !getPegDOMIsDisabled(attemptPegDOM);
      });
    });
  }

  getCurrentAttempt() {
    const attempt = new Attempt();

    const attemptBoxDOM = this.getCurrentAttemptBoxDOM();

    if (!attemptBoxDOM) return attempt;

    const attemptBoxIndex = getDOMDatasetIndex(attemptBoxDOM);
    const attemptPegDOMs = getSceneBoardAttemptBoxPegDOMs(attemptBoxIndex);

    attemptPegDOMs.forEach((attemptPegDOM, index) => {
      attempt.values[index] = getPegDOMColor(attemptPegDOM);
    });

    return attempt;
  }

  /**
   * @returns {HTMLElement | null}
   */
  getSelectedAttemptPegDOM() {
    let selectedAttemptPegDOM = null;

    this.attemptBoxDOMs.find((attemptBoxDOM) => {
      const attemptBoxIndex = getDOMDatasetIndex(attemptBoxDOM);
      const attemptPegDOMs = getSceneBoardAttemptBoxPegDOMs(attemptBoxIndex);

      selectedAttemptPegDOM = attemptPegDOMs.find((attemptPegDOM) => {
        return getPegDOMIsSelected(attemptPegDOM);
      });

      return !!selectedAttemptPegDOM;
    });

    return selectedAttemptPegDOM;
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
