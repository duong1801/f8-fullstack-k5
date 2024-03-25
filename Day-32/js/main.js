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

function handleDragstart(e) {
	var index = e.target.dataset.index;

	elementDrag = e.target;
	e.dataTransfer.setData("text", index);
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
}

function handleDragleave(e) {
	e.preventDefault();
	insertAfter(e.target, elementDrag);
}

function handleDragend(e) {
	e.preventDefault();
	e.target.classList.remove("ghost");
}

function handleDrop(e) {}

function insertAfter(referenceNode, newNode) {
	// console.log(referenceNode.parentNode);
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
