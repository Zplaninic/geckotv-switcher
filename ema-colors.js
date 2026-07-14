(function () {
  const COLORS = { 8: '#00FF00', 34: '#FFFF00' };

  function applyColors() {
    const cw = window.chartWidget;
    if (!cw || typeof cw.model !== 'function') return false;

    const sources = cw.model().dataSources();
    const emaStudies = sources.filter((s) => s.name && s.name() === 'Moving Average Exponential');
    if (emaStudies.length === 0) return false;

    let applied = false;
    emaStudies.forEach((study) => {
      const props = study.properties();
      const length = props.childs().inputs.childs().length.value();
      const color = COLORS[length];
      if (!color) return;
      props.childs().styles.childs().MovAvgExp.childs().color.setValue(color);
      applied = true;
    });
    return applied;
  }

  if (applyColors()) return;

  const interval = setInterval(() => {
    if (applyColors()) clearInterval(interval);
  }, 500);

  setTimeout(() => clearInterval(interval), 15000);
})();
