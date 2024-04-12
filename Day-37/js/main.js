/** @format */

import Todo from "./todo.js";
const todoListEl = document.querySelector(".todo-list");
const btnAddTodo = document.querySelector(".btn-add-todo");
//render todo list
Todo.index(todoListEl);

btnAddTodo.addEventListener("click", function () {});
