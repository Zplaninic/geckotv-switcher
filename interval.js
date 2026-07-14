(function () {
  const desc = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'src');

  Object.defineProperty(HTMLIFrameElement.prototype, 'src', {
    configurable: true,
    enumerable: true,
    get() {
      return desc.get.call(this);
    },
    set(value) {
      if (typeof value === 'string' && value.includes('tradingview.com/widgetembed')) {
        try {
          const url = new URL(value);
          const config = JSON.parse(decodeURIComponent(url.hash.slice(1)));
          config.interval = 'D';
          // Colors aren't set here: TradingView's widgetembed config silently ignores
          // per-study "overrides" for tv-basicstudies indicators. ema-colors.js sets
          // them at runtime instead, once the chart is live.
          config.studies = JSON.stringify([
            { id: 'MASimple@tv-basicstudies', inputs: { length: 200 } },
            { id: 'MAExp@tv-basicstudies', inputs: { length: 8 } },
            { id: 'MAExp@tv-basicstudies', inputs: { length: 34 } },
          ]);
          url.hash = encodeURIComponent(JSON.stringify(config));
          value = url.toString();
        } catch (e) {
          // malformed widget config; fall through with the original value
        }
      }
      return desc.set.call(this, value);
    },
  });
})();
