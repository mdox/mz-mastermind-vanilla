class MessageController {
  constructor() {
    this.modalDOM = getModalDOM();
    this.wonTextDOM = getModalMessageWonTextDOM();
    this.lostTextDOM = getModalMessageLostTextDOM();
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
    setDOMIsTransparent(this.modalDOM, false);
  }

  hide() {
    setDOMIsTransparent(this.modalDOM, true);
  }

  reset() {
    this.hide();
  }
}
