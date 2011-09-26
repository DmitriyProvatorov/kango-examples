function MyExtension() {
}

MyExtension.prototype = {

};

kango.ui.addEventListener(kango.ui.event.Ready, function() {
	return new MyExtension();
});