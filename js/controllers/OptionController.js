class OptionController {
  constructor() {
    this.pegDOMs = getOptionBoardPegDOMs();
    this.onColorChoosen = (/** @type {typeof COLORS[number]} */ color) => {};

    this.init();
  }

  // Init / Reset
  init() {
    this.pegDOMs.forEach((pegDOM, index) => {
      const color = COLORS[index];

      setPegDOMColor(pegDOM, color);

      pegDOM.addEventListener("click", () => {
        this.onColorChoosen(color);
      });
    });
  }

  reset() {
    this.pegDOMs.forEach((pegDOM) => {
      setPegDOMIsSelected(pegDOM, false);
      setPegDOMIsDisabled(pegDOM, false);
    });
  }
}
