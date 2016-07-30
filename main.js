function setUpContextMenus() {
  chrome.contextMenus.create({
    id : "VLCTwitch",
    title : "Open in VLC",
    type : "normal",
    contexts : ["link"],
    targetUrlPatterns: ["*://www.twitch.tv/*"]
  });
}


chrome.runtime.onInstalled.addListener(function() {
  // When the app gets installed, set up the context menus
  setUpContextMenus();
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "VLCTwitch") {
    getClickHandler(info);
  }
});



function getClickHandler(info) {
    var url;
    var chatUrl;
    url = info.linkUrl;

    var port = chrome.runtime.connectNative('com.twitch_ext.chrome_extension');
    port.postMessage({ url: url });


    chrome.windows.create({ url: chatUrl, left: 1637, top: 128, width: 284, height: 909, type: "popup"});
}
