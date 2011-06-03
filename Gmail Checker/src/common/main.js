function GmailChecker() {
	var self = this;
	self.refresh();	
	kango.ui.browserButton.addEventListener(kango.ui.browserButton.event.Command, function() {
		self.refresh();
	});
	window.setInterval(function(){self.refresh()}, self._refreshTimeout);
}

GmailChecker.prototype = {

	_refreshTimeout: 60*1000*15,	// 15 minutes
	_feedUrl: 'https://mail.google.com/mail/feed/atom',
	
	_setOffline: function() {
		kango.ui.browserButton.setTooltipText('Offline');
		kango.ui.browserButton.setIcon('icons/icon16_gray.png');
		kango.ui.browserButton.setBadge(null);
	},
	
	_setUnreadCount: function(count) {
		kango.ui.browserButton.setTooltipText('Unread count: ' + count);
		kango.ui.browserButton.setIcon('icons/icon16.png');
		kango.ui.browserButton.setBadge((count != 0) ? {text: count} : null);
	},
	
	refresh: function() {		
		var details = {
			url: this._feedUrl,
			method: 'GET',
			async: true,
			contentType: 'xml'	
		};
		var self = this;
		kango.xhr.send(details, function(data) {
			if(data.status == 200) {
				var doc = data.response;
				var count = doc.getElementsByTagName('fullcount')[0].childNodes[0].nodeValue;
				self._setUnreadCount(count);
			}
			else { // something went wrong
				self._setOffline();
			}
		});
	}
};

kango.ui.addEventListener(kango.ui.event.Ready, function() {
	return new GmailChecker();
});