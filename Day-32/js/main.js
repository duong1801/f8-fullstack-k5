/** @format */
import data from "./data.js";
import Blue from "./createElement.js";
var listBox = document.querySelector(".list");
//render list-item

function render() {
	data.sort(function (a, b) {
		return a.index - b.index;
	});
	var countMoudle = 0;
	var countLesson = 0;

	var itemsArr = data.map(function (item) {
		if (item.isModule) {
			countMoudle++;
		} else {
			countLesson++;
		}
		return Blue.createElement(
			"div",
			{
				class: `list-item ${item.isModule ? "active" : ""}`,
				draggable: "true",
				"data-index": item.index,
				onDragstart: function (e) {
					handleDragstart(e);
				},
				onDragleave: function (e) {
					handleDragleave(e);
				},

				onDrag: function (e) {
					handleDrag(e);
				},

				onDrop: function (e) {
					handleDrop(e);
				},
				onDragend: function (e) {
					handleDragend(e);
				},
				onDragenter: function (e) {
					handleDragenter(e);
				},
				onDragover: function (e) {
					handleDragover(e);
				},
			},
			`${
				item.isModule
					? "Module: " + countMoudle + ":"
					: "Bài:" + countLesson + ":"
			} ${item.name}`
		);
	});

	listBox.append(...itemsArr);
}

render();
var elementDrag = null;
var indexElementDrag = null;
var clientY = null;
var offsetY = null;

function handleDragstart(e) {
	elementDrag = e.target;
	indexElementDrag = elementDrag.dataset.index;
	clientY = e.clientY;
	offsetY = e.offsetY;
}
function handleDragenter(e) {
	// console.log(elementTarget);
}
function handleDrag(e) {
	e.preventDefault();
	e.target.classList.add("ghost");
}

function handleDragover(e) {
	e.preventDefault();
	var elementTarget = e.target;
	var indexElementTarget = elementTarget.dataset.index;
	var clientYDrag = e.clientY;
	// console.log(indexElementDrag);

	// console.log(clientY);
	// if (indexElementTarget !== indexElementDrag) {
	if (clientYDrag < clientY) {
		console.log(clientYDrag);
		var spaceElTargetToTop =
			elementTarget.getBoundingClientRect().top +
			elementTarget.clientHeight / 10;
		var spaceElDragToTop = clientYDrag - offsetY;
		if (spaceElDragToTop <= spaceElTargetToTop) {
			listBox.insertBefore(elementDrag, elementTarget);
		}
	} else {
		console.log(clientYDrag);
		var spaceElDragBotToTop = clientYDrag - offsetY + elementDrag.clientHeight;
		var spaceElTargetBotToTop =
			elementTarget.getBoundingClientRect().bottom -
			elementTarget.clientHeight / 10;
		if (spaceElDragBotToTop >= spaceElTargetBotToTop) {
			listBox.insertBefore(elementDrag, elementTarget.nextSibling);
		}
	}
	// }
}

function handleDragleave(e) {
	e.preventDefault();
	// insertAfter(e.target, elementDrag);
}

function handleDragend(e) {
	e.preventDefault();
	e.target.classList.remove("ghost");
	elementDrag = null;
	indexElementDrag = null;
}

function handleDrop(e) {}
