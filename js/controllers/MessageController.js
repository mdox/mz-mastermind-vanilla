class MessageController {
  constructor() {
    this.modalDOM = getModalDOM();
    this.wonTextDOM = getModalMessageWonTextDOM();
    this.lostTextDOM = getModalMessageLostTextDOM();

    this.timeouts = [];
  }

  clearTimeouts() {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
  }

  showWonMessage() {
    setDOMIsHidden(this.wonTextDOM, false);
    setDOMIsHidden(this.lostTextDOM, true);
  }

  showLostMessage() {
    setDOMIsHidden(this.wonTextDOM, true);
    setDOMIsHidden(this.lostTextDOM, false);
  }

  show() {
    this.clearTimeouts();
    setDOMIsHidden(this.modalDOM, false);
    this.timeouts.push(
      setTimeout(() => setDOMIsTransparent(this.modalDOM, false), 1)
    );
  }

  hide() {
    this.clearTimeouts();
    this.timeouts.push(
      setTimeout(() => setDOMIsHidden(this.modalDOM, true), 500)
    );
    setDOMIsTransparent(this.modalDOM, true);
  }

  reset() {
    this.clearTimeouts();
    this.hide();
  }
}
