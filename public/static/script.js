"use client";

document.querySelector("body").addEventListener(
	"scroll",
	function (e) {
		console.log(123);
		var el = e.target;
		while (el && el !== document && !isScrollable(el)) {
			el = el.parent;
		}
		log("Scrolled element: " + (el.className || "document"));
	},
	true
);

function isScrollable(el) {
	return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
}

function log(x) {
	document.querySelector("h2").innerHTML = x;
}
