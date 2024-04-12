/** @format */

class Todo {
	constructor(parentEl, modal) {
		this.parentEl = parentEl;
		this.modal = modal;
	}

	isCompleting = false;
	parentEl = null;
	modal = null;
	// todoApi = "https://fct976-8080.csb.app/tasks";
	todoApi = "http://localhost:3000/tasks";
	isShowTasksCompleted = false;

	getOptions = (method, data = "") => {
		method = method.toLowerCase();
		const options = {
			method,
			headers: {
				"Content-Type": "application/json",
			},
		};
		if (method !== "get" && method !== "delete" && data) {
			options.body = JSON.stringify(data);
			return options;
		}
		return options;
	};

	index = async () => {
		try {
			const response = await fetch(this.todoApi);
			const tasks = await response.json();
			this.render(tasks);
		} catch (e) {
			alert(e);
		}
	};

	getTaskCompleted = (tasks) => {
		const taskCompleted = tasks?.filter(({ isCompleted }) => isCompleted);
		return taskCompleted;
	};
	getTaskInCompleted = (tasks) => {
		const taskInCompleted = tasks?.filter(({ isCompleted }) => !isCompleted);
		return taskInCompleted;
	};

	getCountTasksCompleted = (tasks) => {
		const count = tasks?.reduce((count, task) => {
			if (task.isCompleted) {
				return count + 1;
			}
			return count;
		}, 0);
		return count;
	};

	getDetail = async (id) => {
		const response = await fetch(this.todoApi + `/${id}`);
		const tasks = await response.json();
		return tasks;
	};

	render = (tasks, keywords = "") => {
		this.parentEl.innerHTML = `
			${this.getTaskInCompleted(tasks)
				.map(
					({ id, name }) => `
						<div
							class="todo mt-2.5 flex w-full items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow">
							<span class="font-normal text-gray-700">${this.hightlight(
								name,
								keywords
							)}</span>
							<div class="flex gap-2">
								<button data-id="${id}" data-type="delete"
									type="button"
									class="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-700 hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300">
									<i  style="color:white" class="fa-regular fa-trash-can"></i></button
								><button data-id="${id}" data-type="update"
									type="button"
									class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
									<i style="color:white" class="fa-solid fa-pen-to-square"></i></button
								><button data-id="${id}" data-type="completed"
									type="button"
									class="bg-gray-400 flex h-10 w-10 items-center justify-center rounded-lg hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300">
									<i style="color:white" class="fa-regular fa-rectangle-list"></i>
								</button>
							</div>
						</div>
			`
				)
				.join("")}
				<button 	
							type="button"
							class="btn-show ${
								this.isShowTasksCompleted ? "bg-emerald-700" : "bg-gray-400"
							}  focus:ring-gray-100 mt-2.5 flex items-center gap-2 rounded-lg px-4 py-2.5 transition-all focus:outline-none focus:ring-4">
							<span class="font-medium text-white">Completed Todos ${this.getCountTasksCompleted(
								tasks
							)}</span
							><i style="color:white" ${
								this.isShowTasksCompleted ? "hidden" : ""
							}  class="fa-regular fa-circle-right"></i>
							<i style="color:white" class="fa-regular ${
								this.isShowTasksCompleted ? "" : "hidden"
							} fa-circle-down"></i>
				</button>
				<div class="todo-completed ${this.isShowTasksCompleted ? "" : "hidden"}">
							${this.getTaskCompleted(tasks)
								.map(
									({ id, name }) => `
										<div
											class="mt-2.5 flex w-full items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow">
											<span class="font-normal text-gray-700">${this.hightlight(
												name,
												keywords
											)}</span>
											<div class="flex gap-2">
												<button data-id="${id}" data-type="delete"
													type="button"
													class="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-700 hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300">
													<i  style="color:white" class="fa-regular fa-trash-can"></i></button
												><button data-id="${id}" data-type="update"
													type="button"
													class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
													<i style="color:white" class="fa-solid fa-pen-to-square"></i></button
												><button data-id="${id}" data-type="completed" 
													type="button"
													class="bg-emerald-700 flex h-10 w-10 items-center justify-center rounded-lg hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300">
													<i style="color:white"  class="fa-regular fa-rectangle-list"></i>
												</button>
											</div>
										</div>
			`
								)
								.join("")}
				</div>
		`;
	};

	add = async (data) => {
		try {
			const options = this.getOptions("POST", data);
			const response = await fetch(this.todoApi, options);
			if (response.ok) {
				this.index();
				alert("created successfully!");
			}
		} catch (e) {
			alert(e.message);
		} finally {
			this.modal.classList.add("hidden");
		}
	};

	update = async (data, id) => {
		try {
			const options = this.getOptions("PATCH", data);
			const response = await fetch(`${this.todoApi}/${id}`, options);
			if (response.ok) {
				this.index();
				if (!this.isCompleting) {
					alert("Updated successfully!");
				}
			}
			this.isCompleting = false;
		} catch (e) {
			alert(e.message);
		}
	};

	delete = async (id) => {
		try {
			const options = this.getOptions("DELETE");
			const response = await fetch(`${this.todoApi}/${id}`, options);
			if (response.ok) {
				this.index();
				alert("Deleted successfully!");
			}
		} catch (e) {
			alert(e.message);
		}
	};
	completed = async (id) => {
		this.isCompleting = true;
		const { isCompleted, ...rest } = await this.getDetail(id);
		const newData = { ...rest, isCompleted: !isCompleted };
		this.update(newData, id);
	};

	search = async (kewords) => {
		try {
			const response = await fetch(`${this.todoApi}/?q=${kewords}`);
			const tasks = await response.json();
			this.render(tasks, kewords);
		} catch (e) {
			alert(e.message);
		}
	};
	hightlight = (name, keywords) => {
		console.log(keywords);
		const keywordsLength = keywords.length;
		const position = name.indexOf(keywords);

		if (keywords && position != -1) {
			const firstword = name.slice(0, position);
			const endWord = name.slice(position + keywordsLength);
			const newName = `${firstword}<span class="bg-blue-100 font-bold">${keywords}</span>${endWord}`;
			console.log(newName);
			return newName;
		}
		return name;
	};
}

export default Todo;
