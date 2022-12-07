/**
 * @param {HTMLElement} pegDOM
 */
function getPegDOMColor(pegDOM) {
  return pegDOM.dataset.color ?? "";
}

/**
 * @param {HTMLElement} pegDOM
 */
function getPegDOMIsDisabled(pegDOM) {
  return pegDOM.classList.contains("disabled");
}

/**
 * @param {HTMLElement} pegDOM
 */
function getPegDOMIsSelected(pegDOM) {
  return pegDOM.classList.contains("selected");
}

/**
 * @param {HTMLElement} dom
 * @returns number
 */
function getDOMDatasetIndex(dom) {
  return parseInt(dom.dataset.index);
}

/**
 * @param {HTMLElement} codePegDOM
 * @param {boolean} isUnveiled
 */
function setCodePegDOMIsUnveiled(codePegDOM, isUnveiled) {
  if (isUnveiled) {
    codePegDOM.classList.add("unveiled");
  } else {
    codePegDOM.classList.remove("unveiled");
  }
}

/**
 * @param {HTMLElement} pegDOM
 * @param {boolean} isDisabled
 */
function setPegDOMIsDisabled(pegDOM, isDisabled) {
  if (isDisabled) {
    pegDOM.classList.add("disabled");
  } else {
    pegDOM.classList.remove("disabled");
  }
}

/**
 * @param {HTMLElement} pegDOM
 * @param {boolean} isSelected
 */
function setPegDOMIsSelected(pegDOM, isSelected) {
  if (isSelected) {
    pegDOM.classList.add("selected");
  } else {
    pegDOM.classList.remove("selected");
  }
}

/**
 * @param {HTMLElement} pegDOM
 * @param {typeof COLORS[number] | "" | undefined} color
 */
function setPegDOMColor(pegDOM, color) {
  if (color) {
    pegDOM.dataset.color = color;
  } else {
    delete pegDOM.dataset.color;
  }
}

/** @returns {HTMLElement[]} */
function getOptionBoardPegDOMs() {
  return [...getOptionBoardDOM().querySelectorAll(".peg")];
}

/** @returns {HTMLElement} */
function getOptionBoardDOM() {
  return getBoardsDOM().querySelector(".option.board");
}

/** @returns {HTMLElement[]} */
function getSceneBoardCodeBoxPegDOMs() {
  return [...getSceneBoardCodeBoxDOM().querySelectorAll(".peg")];
}

/** @returns {HTMLElement} */
function getSceneBoardCodeBoxDOM() {
  return getSceneBoardDOM().querySelector(".code.box");
}

/** @returns {HTMLElement[]} */
function getSceneBoardAttemptBoxPegDOMs(attemptBoxIndex) {
  return [
    ...getSceneBoardAttemptBoxDOMs()[attemptBoxIndex].querySelectorAll(".peg"),
  ];
}

/** @returns {HTMLElement[]} */
function getSceneBoardAttemptBoxDOMs() {
  return [...getSceneBoardDOM().querySelectorAll(".attempt.box")];
}

/** @returns {HTMLElement} */
function getSceneBoardDOM() {
  return getBoardsDOM().querySelector(".scene.board");
}

/** @returns {HTMLElement[]} */
function getScoreBoardBoxPegDOMs(boxIndex) {
  return [...getScoreBoardBoxDOMs()[boxIndex].querySelectorAll(".peg")];
}

/** @returns {HTMLElement[]} */
function getScoreBoardBoxDOMs() {
  return [...getScoreBoardDOM().querySelectorAll(".box")];
}

/** @returns {HTMLElement} */
function getScoreBoardDOM() {
  return getBoardsDOM().querySelector(".score.board");
}

/** @returns {HTMLElement} */
function getBoardsDOM() {
  return document.querySelector(".boards");
}

/**
 * @param {HTMLElement} dom
 * @param {boolean} isTransparent
 */
function setDOMIsTransparent(dom, isTransparent) {
  if (isTransparent) {
    dom.classList.add("transparent");
  } else {
    dom.classList.remove("transparent");
  }
}

/**
 * @param {HTMLElement} dom
 * @param {boolean} isHidden
 */
function setDOMIsHidden(dom, isHidden) {
  if (isHidden) {
    dom.classList.add("hidden");
  } else {
    dom.classList.remove("hidden");
  }
}

/** @returns {HTMLElement} */
function getEasyGameButtonDOM() {
  return document.querySelector(".button.easy");
}

/** @returns {HTMLElement} */
function getHardGameButtonDOM() {
  return document.querySelector(".button.hard");
}

/** @returns {HTMLElement} */
function getRestartGameButtonDOM() {
  return document.querySelector(".button.restart");
}

/** @returns {HTMLElement} */
function getModalMessageLostTextDOM() {
  return getModalMessageDOM().querySelector(".lost");
}

/** @returns {HTMLElement} */
function getModalMessageWonTextDOM() {
  return getModalMessageDOM().querySelector(".won");
}

/** @returns {HTMLElement} */
function getModalMessageDOM() {
  return getModalDOM().querySelector(".message");
}

/** @returns {HTMLElement} */
function getModalDOM() {
  return document.querySelector(".modal");
}

function initInstanceDOMs() {
  /** @type {HTMLElement[]} */
  const subjectsInOrder = [
    ...document.querySelectorAll("[data-instances-count]"),
  ]
    .map((subject) => getHTMLElementSelectorPath(subject))
    .sort()
    .reverse()
    .map((selectorPath) => document.querySelector(selectorPath));

  for (const subject of subjectsInOrder) {
    const instancesCount = parseInt(subject.dataset.instancesCount);

    delete subject.dataset.instancesCount;

    for (let i = 0; i < instancesCount; ++i) {
      /** @type {HTMLElement} */
      const instance = subject.cloneNode(true);
      instance.dataset.index = i;
      subject.parentElement.insertBefore(instance, subject);
    }

    subject.parentElement.removeChild(subject);
  }
}

function getHTMLElementSelectorPath(/** @type {HTMLElement} */ childEl) {
  /** @type {string[]} */
  const path = [];

  for (
    let currentEl = childEl;
    currentEl.parentElement;
    currentEl = currentEl.parentElement
  ) {
    const classList = [...currentEl.classList];
    const tagName = currentEl.tagName.toLowerCase();
    const elNth =
      Array.prototype.indexOf.call(
        currentEl.parentElement.children,
        currentEl
      ) + 1;
    const elLocalSelector =
      [tagName, classList.join(".")].filter(Boolean).join(".") +
      `:nth-child(${elNth})`;
    path.unshift(elLocalSelector);
  }

  return path.join(" > ");
}
