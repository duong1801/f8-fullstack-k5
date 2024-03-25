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
var clientY = 0;
var offsetY = 0;

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

	if (indexElementTarget !== indexElementDrag) {
		if (clientYDrag < clientY) {
			clientY = clientYDrag;
			var spaceElTargetToTop =
				elementTarget.getBoundingClientRect().top +
				elementTarget.offsetHeight / 10;
			var spaceElDragToTop = clientYDrag - offsetY;
			if (spaceElDragToTop <= spaceElTargetToTop) {
				listBox.insertBefore(elementDrag, elementTarget);
			}
		} else {
			clientY = clientYDrag;
			var spaceElDragBotToTop =
				clientYDrag - offsetY + elementDrag.offsetHeight;
			var spaceElTargetBotToTop =
				elementTarget.getBoundingClientRect().bottom -
				elementTarget.offsetHeight / 10;
			if (spaceElDragBotToTop >= spaceElTargetBotToTop) {
				listBox.insertBefore(elementDrag, elementTarget.nextSibling);
			}
		}
	}
}

function handleDragleave(e) {
	e.preventDefault();
}

function handleDragend(e) {
	e.preventDefault();
	e.target.classList.remove("ghost");
	elementDrag = null;
	indexElementDrag = 0;
	clientY = 0;
	offsetY = 0;
}

function handleDrop(e) {}
