/**
 * Based on Timing.js 1.0.4
 * Copyright 2015 Addy Osmani
 *
 * node-timing.js was initially created to run timing.js in a selenium webdriver instance.
 * This uses module.exports to safely pull out a function that browser.driver.executeScript() can understand.
 */
exports.getTimes = function (opts) {
    var performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;

    if (performance === undefined) {
        console.log('Unfortunately, your browser does not support the Navigation Timing API');
        return;
    }

    var timing = performance.timing;
    var api = {};
    opts = opts || {};

    if (timing) {
        if(opts && !opts.simple) {
            for (var k in timing) {
                if (timing.hasOwnProperty(k)) {
                    api[k] = timing[k];
                }
            }
        }


        // Time to first paint
        if (api.firstPaint === undefined) {
            // All times are relative times to the start time within the
            // same objects
            var firstPaint = 0;

            // Chrome
            if (window.chrome && window.chrome.loadTimes) {
                // Convert to ms
                firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;
                api.firstPaintTime = firstPaint - (window.chrome.loadTimes().startLoadTime*1000);
            }
            // IE
            else if (typeof window.performance.timing.msFirstPaint === 'number') {
                firstPaint = window.performance.timing.msFirstPaint;
                api.firstPaintTime = firstPaint - window.performance.timing.navigationStart;
            }

            if (opts && !opts.simple) {
                api.firstPaint = firstPaint;
            }
        }

        // Total time from start to load
        api.loadTime = timing.loadEventEnd - timing.fetchStart;
        // Time spent constructing the DOM tree
        api.domReadyTime = timing.domComplete - timing.domInteractive;
        // Time consumed preparing the new page
        api.readyStart = timing.fetchStart - timing.navigationStart;
        // Time spent during redirection
        api.redirectTime = timing.redirectEnd - timing.redirectStart;
        // AppCache
        api.appcacheTime = timing.domainLookupStart - timing.fetchStart;
        // Time spent unloading documents
        api.unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
        // DNS query time
        api.lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
        // TCP connection time
        api.connectTime = timing.connectEnd - timing.connectStart;
        // Time spent during the request
        api.requestTime = timing.responseEnd - timing.requestStart;
        // Request to completion of the DOM loading
        api.initDomTreeTime = timing.domInteractive - timing.responseEnd;
        // Load event time
        api.loadEventTime = timing.loadEventEnd - timing.loadEventStart;
    }

    return api;
};
