/** @format */
import Todo from "./todo.js";
import helper from "./helper.js";

window.addEventListener("load", (event) => {
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
	const btnSearch = $(".btn-search");
	let isUpdate = false;
	let todoIdUpdate = null;

	const isCompleted = false;
	const loading = $(".loading");
	setTimeout(() => {
		loading.classList.add("hidden");
	}, 700);
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
			let data = helper.encodeFormData(
				Object.fromEntries([...new FormData(e.target)])
			);
			data = { ...data, isCompleted };
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
		if (e.target.matches("i") || e.target.matches("span")) {
			btnEl = e.target.parentElement;
		} else {
			btnEl = e.target;
		}

		if (btnEl.dataset.type === "completed" && btnEl.dataset.id) {
			const todoIdCompleted = btnEl.dataset.id;
			todo.completed(todoIdCompleted);
		}

		if (btnEl.dataset.type === "delete" && btnEl.dataset.id) {
			if (confirm("Bạn có chắc chắn?")) {
				const todoIdDelete = btnEl.dataset.id;
				todo.delete(todoIdDelete);
			}
		}

		if (btnEl.dataset.type === "update" && btnEl.dataset.id) {
			isUpdate = true;
			todoIdUpdate = btnEl.dataset.id;
			const nameValue = btnEl.parentElement.previousElementSibling.textContent;
			inputFrom.value = nameValue;
			modal.classList.remove("hidden");
		}
		if (btnEl.classList.contains("btn-show")) {
			todo.isShowTasksCompleted = !todo.isShowTasksCompleted;

			const fristChild = btnEl.querySelector("i:first-of-type");
			const lastChild = btnEl.querySelector("i:last-of-type");
			const todoCompleted = $(".todo-completed");
			todoCompleted.classList.toggle("hidden");

			btnEl.classList.toggle("bg-emerald-700");
			btnEl.classList.toggle("bg-gray-400");
			fristChild.classList.toggle("hidden");
			lastChild.classList.toggle("hidden");
		}
	});

	//search todo

	inputSearch.addEventListener("input", function (e) {
		const keywords = e.target.value.trim();
		const replacedStr = keywords.replace(/\d+|true|false/g, "***");
		todo.search(replacedStr);
	});

	btnSearch.addEventListener("click", function () {
		const keywords = inputSearch.value.trim();
		const replacedStr = keywords.replace(/\d+|true|false/g, "***");
		todo.search(replacedStr);
	});
});
