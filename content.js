(function () {
  function clickTradingViewToggle() {
    const btn = document.querySelector('#live-chart-tradingview');
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  }

  if (clickTradingViewToggle()) return;

  const observer = new MutationObserver(() => {
    if (clickTradingViewToggle()) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => observer.disconnect(), 15000);
})();
