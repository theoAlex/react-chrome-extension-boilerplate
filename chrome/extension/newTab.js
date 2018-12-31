const escapeStringRegexp = require('escape-string-regexp');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  switch(true) {
    case request.loaded:
    chrome.storage.sync.get('isFirstTime', items => {
      if(items.isFirstTime === undefined) {
        console.log('isFirstTime')
        getSitesFirstTime()
      } else {
        console.log('isNotFirstTime')
        getStoredSuggestedSites()
      }
    })
  }
})

function getSitesFirstTime() {
  chrome.topSites.get(topSites => {
    let topSitesWithKeys = topSites.map((site,i) => {
      return {
        thumbnailKey: `thumbnail_key_${i}`,
        isThumbnailCached: false,
        ...site
      }
    })
    sendMsgToNewTab({ suggestedSites: topSitesWithKeys })
    chrome.storage.sync.set({ suggestedSites: topSitesWithKeys })
    chrome.storage.sync.set({ isFirstTime: false })
  })
}

function getStoredSuggestedSites() {
  chrome.storage.sync.get('suggestedSites', items => {
    const { suggestedSites } = items
    console.log(suggestedSites)
    sendMsgToNewTab({ suggestedSites: suggestedSites })
    suggestedSites.forEach(site => {
      if (site.isThumbnailCached) {
        chrome.storage.local.get(site.thumbnailKey, items => {
          sendMsgToNewTab(items)
        })
      }
    })
  })
}

function sendMsgToNewTab(msg) {
  console.log(msg)
  chrome.tabs.query({active: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, msg)
  })
}

chrome.webNavigation.onCompleted.addListener(details => {
  const { tabId } = details
  console.log(details)
  chrome.storage.sync.get('suggestedSites', items => {
    if (items.suggestedSites !== undefined) {
      const { suggestedSites } = items
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        const { url } = tabs[0]
        suggestedSites.forEach(site => {
          if (!site.isThumbnailCached) {
            if (getRegExpForHttpsAndHttp(site.url).test(url)) {
              cacheImage(site)
            } else if (isSameDomain(site.url, url)) {
              cacheImage(site)
            }
          }
        })
      })
    }
  })
})

function getRegExpForHttpsAndHttp(url) {
  return new RegExp(('http(s)?:' + escapeStringRegexp(url.split(':').slice(1).join())))
}

function isSameDomain(suggestedSite, navigatedSite) {
  return getRegExpForHttpsAndHttp(addTrailingSlash(getDomain(suggestedSite))).test(addTrailingSlash(getDomain(navigatedSite)))
}
/* 
function removeProtocol(url) {
  return url.replace(/http(s)?/,)
} */

function addTrailingSlash(url) {
  if (url.charAt(url.length - 1) === '/') {
    return url + '/'
  } else {
    return url
  }
}

function getDomain(suggestedSite) {
  return suggestedSite.replace(suggestedSite.split('.')[suggestedSite.split('.').length - 1].split('/').slice(1).join('/'), '')
}

function cacheImage(site) {
  console.log('caching', site)
  chrome.tabs.captureVisibleTab({ quality: 5 }, dataUrl => {
    console.log(site.thumbnailKey)
    chrome.storage.local.set({ [site.thumbnailKey]: dataUrl })
    chrome.storage.sync.get('suggestedSites', items => {
      const { suggestedSites } = items
      let siteIndex = suggestedSites.findIndex(item => item.thumbnailKey === site.thumbnailKey)
      console.log(siteIndex)
      let newSuggestedSites = [
        ...suggestedSites.slice(0, siteIndex),
        {
          ...site,
          isThumbnailCached: true
        },
        ...suggestedSites.slice(siteIndex + 1)
      ]
      console.log(newSuggestedSites)
      chrome.storage.sync.set({'suggestedSites': newSuggestedSites})
    })
  })
}
