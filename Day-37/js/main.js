/** @format */

import Todo from "./todo.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const todoListEl = $(".todo-list");
const btnAddTodo = $(".btn-add-todo");
const inputSearch = $(".input-search");
const modal = $(".modal");
const form = $("form");
const btnCancel = $(".btn-cancel");
const todo = new Todo(todoListEl, modal);

//render todo list
todo.index();

//add todo
btnAddTodo.addEventListener("click", function () {
	modal.classList.remove("hidden");
	form.addEventListener("submit", function (e) {
		e.preventDefault();
		const data = Object.fromEntries([...new FormData(e.target)]);
		todo.add(data);
		form.reset();
	});
	btnCancel.addEventListener("click", function () {
		modal.classList.add("hidden");
	});
});

//update todo
// root.querySelector(".todo").addEventListener("click", (e) => {
// 	if (e.target.dataset.type === "detail" && e.target.dataset.id) {
// 		const userId = e.target.dataset.id;
// 		showDetailUser(userId);
// 	}
// 	if (e.target.dataset.type === "delete" && e.target.dataset.id) {
// 		if (confirm("Bạn có chắc chắn?")) {
// 			const userId = e.target.dataset.id;
// 			deleteUser(userId);
// 		}
// 	}

// 	if (e.target.dataset.type === "update" && e.target.dataset.id) {
// 		const userId = e.target.dataset.id;
// 		updateUser(userId);
// 	}
// });
