(function () {
    'use strict';
    /**
     * Cross-browser Performance Timing measurements
     * Targeted at evergreen browsers.
    **/
    function getMeasurements() {
        var performance = window.performance 
        || window.webkitPerformance 
        || window.msPerformance 
        || window.mozPerformance;
        var timing = performance.timing;
        var api = {};
        
        if (timing) {
            for (var k in timing) {
                if (timing.hasOwnProperty(k)) {
                    api[k] = timing[k];
                }
            }
            
            // Time to first paint
            if (api.firstPaint === null) {
                // All times are relative times to the start time within the
                // same objects
                
                // Chrome
                if (!!window.chrome && window.chrome.loadTimes) {
                    // Convert to ms
                    api.firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;
                }
                // IE
                else if (typeof api.msFirstPaint === 'number') {
                    api.firstPaint = api.msFirstPaint;
                }
                // Firefox
                // This will use the first times after MozAfterPaint fires
                else if (window.performance.timing.navigationStart && typeof InstallTrigger !== 'undefined') {
                    api.firstPaint = window.performance.timing.navigationStart;
                }
            }
            
            // Total time from start to load
            api.loadTime = timing.loadEventEnd - timing.navigationStart;
            // Time spent constructing the DOM tree
            api.domReadyTime = timing.domComplete - timing.domInteractive;
            // Time consumed prepaing the new page
            api.readyStart = timing.fetchStart - timing.navigationStart;
            // Time spent during redirection
            api.redirectTime = timing.redirectEnd  - timing.redirectStart;
            // AppCache
            api.appcacheTime = timing.domainLookupStart  - timing.fetchStart;
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
    }
});
