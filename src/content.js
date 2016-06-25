document.addEventListener('DOMSubtreeModified', function() {
    var titles = $('#directory-list').find('.ember-view').find('.ember-view').find('.content').find('.title');
    var noButton = titles.not(':has(.vlc-button)');
    var button = $("<button class='vlc-button'>Play in VLC!</button>");
    button.on('click', function(){
        var url = 'https://www.twitch.tv' + $(this).siblings('a').attr('href');
        chrome.runtime.sendMessage({
            linkUrl: url
        });
    });
    noButton.append(button);
});