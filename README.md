timing.js
=========

> Timing.js is a small set of helpers for working with the [Navigation Timing API](https://developer.mozilla.org/en-US/docs/Navigation_timing) to identify where your application is spending its time. Useful as a standalone script, DevTools Snippet or bookmarklet.

## Features

* Normalizes `firstPaint` across Chrome, Opera and IE11 to `timing.getTimes().firstPaint`. Firefox may be able to do similar with `MozAfterPaint`
* Adds `firstPaintTime` (`firstPaint` - load/nav start)
* Adds:`domReadyTime`, `initDomTreeTime`, `loadEventTime`, `loadTime`, `redirectTime`, `requestTime`, `uploadEventTime` `connectTime`

## Installation

### Clone

Download the [latest](https://github.com/addyosmani/timing.js/archive/master.zip) version or just `git clone https://github.com/addyosmani/timing.js.git`.

### Bookmarklet:

```javascript
javascript:(function(e){"use strict";var t=["navigationStart","unloadEventStart","unloadEventEnd","unloadEventTime","redirectStart","redirectEnd","redirectTime","fetchStart","readyStart","domainLookupStart","appcacheTime","domainLookupEnd","lookupDomainTime","connectStart","connectEnd","connectTime","secureConnectionStart","requestStart","responseStart","responseEnd","requestTime","domLoading","domInteractive","initDomTreeTime","firstPaint","firstPaintTime","domContentLoadedEventStart","domContentLoadedEventEnd","domComplete","domReadyTime","loadEventStart","loadEventEnd","loadEventTime","loadTime"];e.timing=e.timing||{getTimes:function(t){var n=e.performance||e.webkitPerformance||e.msPerformance||e.mozPerformance;var i=n.timing;var r={};t=t||{};if(i){if(t&&!t.simple){for(var a in i){if(i.hasOwnProperty(a)){r[a]=i[a]}}}if(r.firstPaint===undefined){var o=0;if(e.chrome&&e.chrome.loadTimes){o=e.chrome.loadTimes().firstPaintTime*1e3;r.firstPaintTime=o-e.chrome.loadTimes().startLoadTime*1e3}else if(typeof e.performance.timing.msFirstPaint==="number"){o=e.performance.timing.msFirstPaint;r.firstPaintTime=o-e.performance.timing.navigationStart}if(t&&!t.simple){r.firstPaint=o}}r.loadTime=i.loadEventEnd-i.navigationStart;r.domReadyTime=i.domComplete-i.domInteractive;r.readyStart=i.fetchStart-i.navigationStart;r.redirectTime=i.redirectEnd-i.redirectStart;r.appcacheTime=i.domainLookupStart-i.fetchStart;r.unloadEventTime=i.unloadEventEnd-i.unloadEventStart;r.lookupDomainTime=i.domainLookupEnd-i.domainLookupStart;r.connectTime=i.connectEnd-i.connectStart;r.requestTime=i.responseEnd-i.requestStart;r.initDomTreeTime=i.domInteractive-i.responseEnd;r.loadEventTime=i.loadEventEnd-i.loadEventStart}return r},printTable:function(e){var t={};var n=this.getTimes(e);Object.keys(n).sort().forEach(function(e){t[e]={ms:n[e],s:+(n[e]/1e3).toFixed(2)}});console.table(t)},printSimpleTable:function(){this.printTable({simple:true})},printTableInOrder:function(e){var n=[];var i=this.getTimes(e);t.map(function(e){if(e in i){n.push({label:e,ms:i[e],s:+(i[e]/1e3).toFixed(2)})}});console.table(n)},printSimpleTableInOrder:function(){this.printTableInOrder({simple:true})}};return timing.printSimpleTable()})(this);
```

### Bower:

```sh
$ bower install timing-js
```

### npm:

```sh
$ npm install timing.js
```

## Usage

By default, running the script will print out a summary table of measurements. The API for the script is as follows:

Get measurements:

```sh
timing.getTimes();
```

Print a summary table of measurements (uses [console.table()](https://plus.google.com/+AddyOsmani/posts/PmTC5wwJVEc)):

```sh
timing.printSimpleTable();
```

![](http://i.imgur.com/zjEST62.png)

Also works in Firefox DevTools (Firefox Nightly only for now):

![](http://i.imgur.com/jY3xHi3.png)

Print a complete table of measurements (including rest of `window.performance`):

```sh
timing.printTable();
```

![](http://i.imgur.com/C9eRQe9.png)


### Sample output of `timing.getTimes()`

Chrome:

```javascript
firstPaint: 1411307463455.813 // New
firstPaintTime: 685.0390625 // New
appcacheTime: 2
connectEnd: 1411307463185
connectStart: 1411307463080
connectTime: 105 // New
domComplete: 1411307463437
domContentLoadedEventEnd: 1411307463391
domContentLoadedEventStart: 1411307463391
domInteractive: 1411307463391
domLoading: 1411307463365
domReadyTime: 46 // New
domainLookupEnd: 1411307463080
domainLookupStart: 1411307463032
fetchStart: 1411307463030
initDomTreeTime: 56 // New
loadEventEnd: 1411307463445
loadEventStart: 1411307463437
loadEventTime: 8 // New
loadTime: 558 // New
lookupDomainTime: 48
navigationStart: 1411307462887
readyStart: 143 // New
redirectEnd: 0
redirectStart: 0
redirectTime: 0 // New
requestStart: 1411307463185
requestTime: 150 // New
responseEnd: 1411307463335
responseStart: 1411307463333
secureConnectionStart: 1411307463130
unloadEventEnd: 0
unloadEventStart: 0
unloadEventTime: 0 // New
```

Firefox:

![](http://i.imgur.com/Drr4A6B.png)

IE 11:

![](http://i.imgur.com/ekVHk3P.png)
