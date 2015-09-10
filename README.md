node-timing.js
=========

> node-timing.js is a small set of helpers for working with the [Navigation Timing API](https://developer.mozilla.org/en-US/docs/Navigation_timing) to identify where your application is spending its time. Useful as a function to be passed to Selenium's `executeScript` function.

## Installation

```sh
$ npm install node-timing.js
```

## Usage

By default, running the script will return an object of measurements. The API for the script is as follows:

Get measurements:

```js
describe('node-timing.js', function () {
    var timings;

    before(function () {
        browser.get('/');
        browser.driver.executeScript(require('../timing').getTimes).then(function (times) {
            timings = times;
        });
    });

    it('should have some timings', function () {
        expect(timings.loadTime).to.be.below(2000 /* milliseconds */);
    });

});
```

### Sample output of `timing.getTimes()`

Chrome:

```js
{
  appcacheTime: 10,
  connectTime: 141,
  domReadyTime: 472,
  firstPaint: 1441899507454.93,
  firstPaintTime: 691.98486328125,
  initDomTreeTime: 483,
  loadEventTime: 0,
  loadTime: 1260,
  lookupDomainTime: 36,
  readyStart: 0,
  redirectTime: 0,
  requestTime: 118,
  unloadEventTime: 0
}
```

Firefox:

```js
{
  appcacheTime: 0,
  connectTime: 0,
  domReadyTime: 388,
  firstPaint: 0,
  initDomTreeTime: 332,
  loadEventTime: 0,
  loadTime: 1002,
  lookupDomainTime: 1,
  readyStart: 1,
  redirectTime: 0,
  requestTime: 167,
  unloadEventTime: 0
}
```

## Build

Run `npm install` to install necessary dependencies for building the library. Check that `npm run jshint` doesn't throw any exceptions.

## License

Released under an MIT license.
