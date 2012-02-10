// ==UserScript==
// @name Test
// @include http://*
// @include https://*
// ==/UserScript==

if(window == window.top) {
	function postPageInfoMessage() {
		var pageInfo = {
			url: document.location.href
		};
		// post messsage to background script
		kango.console.log('Sending info...');
		kango.dispatchMessage('PageInfo', pageInfo);
	}
	
	postPageInfoMessage();
	
	kango.addMessageListener('GetPageInfo', function(event) {
		postPageInfoMessage();
	});
}