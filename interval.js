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
          config.studies = JSON.stringify([
            { id: 'MASimple@tv-basicstudies', inputs: { length: 200 } },
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
