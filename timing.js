/**
 * Timing.js 1.0.4
 * Copyright 2015 Addy Osmani
 */

/**
 * Navigation Timing API helpers
 * timing.getTimes()
 **/

module.exports = function() {
  'use strict'
  if (window.performance === undefined) {
    console.log('Unfortunately, your browser does not support the Navigation Timing API')
    return
  }

  const timing = performance.timing
  let api = Object.create(null)

  for (let k in timing) {
    if (k !== 'toJSON') {
      api[k] = timing[k]
    }
  }

  // Time to first paint
  if (api.firstPaint === undefined) {
    // All times are relative times to the start time within the
    // same objects
    let firstPaint = 0

    // Chrome
    if (window.chrome && window.chrome.loadTimes) {
      // Convert to ms
      firstPaint = window.chrome.loadTimes().firstPaintTime * 1000
      api.firstPaintTime = firstPaint - (window.chrome.loadTimes().startLoadTime*1000)
    }
    // IE
    else if (typeof window.performance.timing.msFirstPaint === 'number') {
      firstPaint = window.performance.timing.msFirstPaint
      api.firstPaintTime = firstPaint - window.performance.timing.navigationStart
    }
    // TODO add FireFox support
    api.firstPaint = firstPaint
  }

  // Total time from start to load
  api.loadTime = timing.loadEventEnd - timing.fetchStart
  // Time spent constructing the DOM tree
  api.domReadyTime = timing.domInteractive - timing.domLoading
  // Time consumed preparing the new page
  api.readyStart = timing.fetchStart - timing.navigationStart
  // Time spent during redirection
  api.redirectTime = timing.redirectEnd - timing.redirectStart
  // AppCache
  api.appcacheTime = timing.domainLookupStart - timing.fetchStart
  // Time spent unloading documents
  api.unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart
  // DNS query time
  api.lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart
  // TCP connection time
  api.connectTime = timing.connectEnd - timing.connectStart
  // Time spent during the request
  api.requestTime = timing.responseEnd - timing.requestStart
  // Request to completion of the DOM loading
  api.initDomTreeTime = timing.domInteractive - timing.responseEnd
  // Load event time
  api.loadEventTime = timing.loadEventEnd - timing.loadEventStart
  // Dom can interacting time
  api.interactingTime = timing.domContentLoadedEventEnd - timing.navigationStart
  return api
}
