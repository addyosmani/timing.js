(function(window) {
    'use strict';
    /**
     * User Timing API helpers
     * timing.getTimes();
     **/
    window.timing = window.timing || {
        getTimes: function() {
            var performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
            var timing = performance.timing;
            var api = {};
            
            var mozFirstPaintTime = null;

        	function mozPaintHandler() {
        		window.removeEventListener('MozAfterPaint', mozPaintHandler);
        		mozFirstPaintTime = new Date().getTime();
        	}
        	window.addEventListener('MozAfterPaint', mozPaintHandler, true);

            if (timing) {
                for (var k in timing) {
                    if (timing.hasOwnProperty(k)) {
                        api[k] = timing[k];
                    }
                }

                // Time to first paint
                if (api.firstPaint === undefined) {
                    // All times are relative times to the start time within the
                    // same objects

                    // Chrome
                    if (window.chrome && window.chrome.loadTimes) {
                        // Convert to ms
                        api.firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;
                        api.firstPaintTime = api.firstPaint - (window.chrome.loadTimes().startLoadTime*1000);
                    }
                    // IE
                    else if (typeof window.performance.timing.msFirstPaint === 'number') {
                        api.firstPaint = window.performance.timing.msFirstPaint;
                        api.firstPaintTime = api.firstPaint - window.performance.timing.navigationStart;
                    }
                    // Firefox
                    // This will use the first times after MozAfterPaint fires
                    else if (window.performance.timing.navigationStart && typeof InstallTrigger !== 'undefined' & mozFirstPaintTime !== null) {
                        api.firstPaint = window.performance.timing.navigationStart;
                        api.firstPaintTime = mozFirstPaintTime - window.performance.timing.navigationStart;
                    }
                }

                // Total time from start to load
                api.loadTime = timing.loadEventEnd - timing.navigationStart;
                // Time spent constructing the DOM tree
                api.domReadyTime = timing.domComplete - timing.domInteractive;
                // Time consumed prepaing the new page
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
        }
    };
})(this);
