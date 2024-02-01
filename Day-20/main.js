/** @format */
box = document.getElementById("box");
var myString =
	"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita praesentium distinctio maiores fugit? Nemo quam optio minima distinctionatus sed.";

var index = 0;
setInterval(function () {
	if (index > myString.length) {
		index = 0;
	}
	applyColorToEachWord(index);
	index++;
}, 150);

function applyColorToEachWord(index) {
	var start, end;
	if (index === 0) {
		start = 0;
		end = myString.indexOf(" ");
	}
	if (myString[index] === " ") {
		start = index + 1;
		end = myString.indexOf(" ", start);
	}

	if (typeof start !== "undefined" && typeof end !== "undefined") {
		highlightWord = myString.slice(start, end);
		box.innerHTML = myString.replace(
			highlightWord,
			`<span>${highlightWord}</span>`
		);
	}
}
