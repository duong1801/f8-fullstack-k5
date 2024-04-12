/** @format */

import Todo from "./todo.js";
import helper from "./helper.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const root = $("#root");
const todoListEl = $(".todo-list");
const btnAddTodo = $(".btn-add-todo");
const inputSearch = $(".input-search");
const modal = $(".modal");
const form = $("form");
const inputFrom = form.querySelector("input");
const btnCancel = $(".btn-cancel");
let isUpdate = false;
let todoIdUpdate = null;
//object initialization
const todo = new Todo(todoListEl, modal);

//render todo list
todo.index();

//add todo
btnAddTodo.addEventListener("click", function () {
	isUpdate = false;
	modal.classList.remove("hidden");
});

form.addEventListener("submit", function (e) {
	e.preventDefault();
	if (!isUpdate) {
		const data = helper.encodeFormData(
			Object.fromEntries([...new FormData(e.target)])
		);
		todo.add(data);
		form.reset();
		modal.classList.add("hidden");
	} else {
		const data = helper.encodeFormData(
			Object.fromEntries([...new FormData(e.target)])
		);
		todo.update(data, todoIdUpdate);
		form.reset();
		modal.classList.add("hidden");
	}
});

btnCancel.addEventListener("click", function () {
	modal.classList.add("hidden");
});

//actions todo

root.querySelector(".todo-list").addEventListener("click", (e) => {
	let btnEl = null;
	if (e.target.matches("i")) {
		btnEl = e.target.parentElement;
	} else {
		btnEl = e.target;
	}

	if (btnEl.dataset.type === "completed" && btnEl.dataset.id) {
		const userId = btnEl.dataset.id;
		todo.completed(userId);
	}

	if (btnEl.dataset.type === "delete" && btnEl.dataset.id) {
		if (confirm("Bạn có chắc chắn?")) {
			const userId = btnEl.dataset.id;
			todo.delete(userId);
		}
	}

	if (btnEl.dataset.type === "update" && btnEl.dataset.id) {
		isUpdate = true;
		todoIdUpdate = btnEl.dataset.id;
		const nameValue = btnEl.parentElement.previousElementSibling.textContent;
		inputFrom.value = nameValue;
		modal.classList.remove("hidden");
	}
});
