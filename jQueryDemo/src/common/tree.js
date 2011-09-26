// ==UserScript==
// @name jQueryDemo
// @include http://*
// ==/UserScript==

// jQuery initialization
var $ = null;
(function (callback) {
	try {
		if(window != window.top) {
			return;
		}
	}
	catch(e) {
		return;
	}
	kango.xhr.send({
		url:'http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js',
		contentType: 'text'
	}, function(data) {
		eval(data.response.toString());
		callback(window.$.noConflict(true));
	});
})(function(obj) {
	$ = obj;
	init();
});

// ---------------------------------------------------------------------------

function init() {
	// Your code here
	insertTree();
}

function insertTree() {
	$(document.createElement('img')).attr({
		src: 'http://kangoextensions.com/misc/tree.png',
		title: 'Christmas tree'
	}).css({
		position: 'absolute',
		top: '10px',
		left: document.body.clientWidth - 280 + 'px',
		'z-index': '10000'
	}).appendTo(document.body);
}