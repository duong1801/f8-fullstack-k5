/** @format */
import dataDefault from "./data.js";
var data = JSON.parse(localStorage.getItem("dataLesson")) || dataDefault;
import Blue from "./createElement.js";
var listBox = document.querySelector(".list");

function render(parentElement) {
	data.sort(function (a, b) {
		return a.position - b.position;
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
				"data-index": item.position,
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

	parentElement.append(...itemsArr);
}

render(listBox);
var elementDrag = null;
var positionElementDrag = null;
var clientY = 0;
var offsetY = 0;

function handleDragstart(e) {
	elementDrag = e.target;
	positionElementDrag = elementDrag.dataset.index;
	clientY = e.clientY;
	offsetY = e.offsetY;
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

	if (indexElementTarget !== positionElementDrag) {
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
	positionElementDrag = 0;
	clientY = 0;
	offsetY = 0;
}

function handleDrop(e) {
	//update position and re-render
	var indexPotionDrop = positionElementDrag - 1;

	var listItem = document.querySelectorAll(".list .list-item");
	console.log(listItem);
	var newIndexItemDrop = Array.from(listItem).findIndex((item) => {
		return item.dataset.index === positionElementDrag;
	});

	var arrItemChangePoition = Array.from(listItem).filter(function (
		item,
		index
	) {
		if (newIndexItemDrop > indexPotionDrop) {
			return index >= indexPotionDrop && index <= newIndexItemDrop;
		}
		return index <= indexPotionDrop && index >= newIndexItemDrop;
	});
	var arrPositionsChange = arrItemChangePoition.map(function (item) {
		return +item.dataset.index;
	});
	data.map(function (item, index) {
		if (arrPositionsChange.includes(item.position)) {
			if (positionElementDrag == item.position) {
				data[index].position = newIndexItemDrop + 1;
			} else {
				data[index].position = getNewIndex(item.position) + 1;
			}
		}
	});
	function getNewIndex(position) {
		var indexItem = Array.from(listItem).findIndex((item) => {
			return +item.dataset.index === position;
		});

		return indexItem;
	}
	listBox.remove();
	var newListBox = Blue.createElement("div", { class: "list" });
	listBox = newListBox;
	render(newListBox);
	document.body.appendChild(newListBox);
	localStorage.setItem("dataLesson", JSON.stringify(data));
}
