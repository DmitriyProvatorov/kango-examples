function MyExtension() {
	//kango.ui.browserButton.setPopup({url:'test.html', width: 600, height:596})
	//kango.ui.browserButton.setPopup(null)
}

MyExtension.prototype = {
};

kango.ui.addEventListener(kango.ui.event.Ready, function() {
	return new MyExtension();
});