/** @format */
box = document.getElementById("box");
var myString =
	"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita praesentium distinctio maiores fugit? Nemo quam optio minima distinctionatus sed.";

var index = 0;
setInterval(function () {
	if (index > myString.length) {
		index = 0;
	}
	applyColorToEachword(index);
	index++;
}, 150);

function applyColorToEachword(index) {
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
		hightlightWord = myString.slice(start, end);
		box.innerHTML = myString.replace(
			hightlightWord,
			`<span>${hightlightWord}</span>`
		);
	}
}
