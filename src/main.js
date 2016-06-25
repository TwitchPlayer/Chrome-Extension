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

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  getClickHandler(request);
});

function httpPOST(data)
{
    var client = new XMLHttpRequest();
    var url = "http://localhost:10000/";
    var body = 'url = ' + data

    client.open("POST", url, true);
    client.setRequestHeader('Content-Type', 'text-plain');

    client.send(body);

    client.onreadystatechange = function() { // (3)
      if (client.readyState != 4) return;
    } 

}

function getClickHandler(info) {
    var url;
    var chatUrl;
    url = info.linkUrl;

	  httpPOST(url);
    
    chatUrl = url + "/chat?popout=";
    chrome.windows.create({ url: chatUrl, left: 1637, top: 128, width: 284, height: 909, type: "popup"});
}
