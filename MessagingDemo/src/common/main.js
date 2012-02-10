function TestProject() {

	function getTooltipTextFromPageInfo(info) {
		return 'Url: ' + info.url;
	}
	
	kango.addMessageListener('PageInfo', function(event) {
		// message from active tab
		if(event.target.isActive()) {
			kango.console.log('Page info received\nTarget tab url=' + event.target.getUrl());
			kango.ui.browserButton.setTooltipText(getTooltipTextFromPageInfo(event.data));
		}
	});
	
	kango.browser.addEventListener(kango.browser.event.TabChanged, function(event) {
		kango.console.log('TabChanged\nTarget tab url=' + event.target.getUrl() + '\nIs tab active=' + event.target.isActive());
		kango.ui.browserButton.setTooltipText('...');
		event.target.dispatchMessage('GetPageInfo');
	});
	
	kango.browser.addEventListener(kango.browser.event.DocumentComplete, function(event) {
		kango.console.log('DocumentComplete\nUrl=' + event.url + '\nTitle=' + event.title + '\nIs tab active=' + event.target.isActive());
	});
	
	kango.browser.addEventListener(kango.browser.event.BeforeNavigate, function(event) {
		kango.console.log('BeforeNavigate\nUrl=' + event.url + '\nIs tab active=' + event.target.isActive());
	});
		
}

kango.ui.addEventListener(kango.ui.event.Ready, function() {

	kango.ui.browserButton.addEventListener(kango.ui.browserButton.event.Command, function() {
	
		kango.browser.tabs.getAll(function(tabs) {
			for(var i = 0; i < tabs.length; i++) {
				kango.console.log(tabs[i].getUrl())
			}
		});
		
		kango.browser.tabs.getCurrent(function(tab) {
			tab.navigate('http://kangoextensions.com/');
		});
	});

	return TestProject();
});