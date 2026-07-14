(function () {
  const RULES = [
    { studyName: 'Moving Average Exponential', plotKey: 'MovAvgExp', colors: { 8: '#00FF00', 34: '#FFFF00' } },
    { studyName: 'Moving Average', plotKey: 'MovAvgSimple', colors: { 50: '#FFA500' } },
  ];

  // TradingView resets these style properties back to theme defaults in an
  // internal pass shortly after study creation, so a one-shot setValue loses
  // the race. Keep re-asserting instead of applying once and stopping.
  function applyColors() {
    const cw = window.chartWidget;
    if (!cw || typeof cw.model !== 'function') return;

    const sources = cw.model().dataSources();

    RULES.forEach(({ studyName, plotKey, colors }) => {
      sources
        .filter((s) => s.name && s.name() === studyName)
        .forEach((study) => {
          const props = study.properties();
          const length = props.childs().inputs.childs().length.value();
          const color = colors[length];
          if (!color) return;
          const colorProp = props.childs().styles.childs()[plotKey].childs().color;
          if (colorProp.value() !== color) colorProp.setValue(color);
        });
    });
  }

  setInterval(applyColors, 1000);
})();
