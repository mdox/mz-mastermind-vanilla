class OptionController {
  constructor() {
    this.pegDOMs = getOptionBoardPegDOMs();
    this.onColorChoosen = (/** @type {typeof COLORS[number]} */ color) => {};

    this.init();
  }

  // Init
  init() {
    this.pegDOMs.forEach((pegDOM, index) => {
      const color = COLORS[index];

      setPegDOMColor(pegDOM, color);

      pegDOM.addEventListener("click", () => {
        this.onColorChoosen(color);
      });
    });
  }
}
