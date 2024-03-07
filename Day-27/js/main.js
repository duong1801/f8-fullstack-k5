/** @format */

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var addTaskBtn = $(".add-task");
var todoList = $(".todo-list");
var data = [{ name: "play game" }, { name: "code" }, { name: "sleep" }];
var indexUpdates = [];

function start() {
	renderTasks();
	addTaskBtn.addEventListener("click", addTask);
}

start();

function renderTasks() {
	function showTodoFormWhenEit(index) {
		if (indexUpdates.length && indexUpdates.includes(index)) {
			return "show";
		}
		return "";
	}

	var htmls = data.map((task, index) => {
		return `
        <div class="todo-group todo-group-${index} ${showTodoFormWhenEit(
			index
		)}">
                <div class="todo">
					<p class="">${task.name}</p>
					<div>
						<i class="fa-regular fa-pen-to-square edit-task" onclick='handleUpdateTask(${index})'></i>
						<i class="fa-solid fa-trash remove-task" onclick="removeTask(${index})"></i>
					</div>
				</div>
                <form class="todo-form">
					<input
						type="text"
						class="todo-input"
						placeholder="What is the task today?"
						value="${
							task.name
						}" /><button onclick="updateTask(${index})" type="button" class="todo-btn btn-update">
						Add Task
					</button>
				</form>
            
                </div>
        `;
	});

	todoList.innerHTML = htmls.join("");
	console.log(indexUpdates);
}

function addTask(e) {
	e.preventDefault();

	var inputEle = addTaskBtn.previousElementSibling;
	var inputValue = inputEle.value;
	if (inputValue) {
		data.push({ name: inputValue });
		inputEle.value = "";
		renderTasks();
	} else {
		alert("Vui lòng nhập dữ liệu");
	}
}

function handleUpdateTask(index) {
	indexUpdates.push(index);
	renderTasks();
}

function updateTask(index) {
	var btnUpdate = $(`.todo-group-${index} .btn-update`);

	var inputUpdateValue = btnUpdate.previousElementSibling.value;
	if (inputUpdateValue) {
		data[index].name = inputUpdateValue;
		indexUpdates = indexUpdates.filter((indexUpdate) => {
			return index !== indexUpdate;
		});
		renderTasks();
	} else {
		alert("Vui lòng nhập dữ liệu khi cập nhật");
	}
}

function removeTask(index) {
	indexUpdates = indexUpdates.map((indexUpdate) => {
		if (indexUpdate > index) {
			return indexUpdate - 1;
		}
		return indexUpdate;
	});
	data.splice(index, 1);

	renderTasks();
}
