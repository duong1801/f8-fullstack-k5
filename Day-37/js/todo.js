/** @format */

class Todo {
	constructor(parentEl, modal) {
		this.parentEl = parentEl;
		this.modal = modal;
	}

	parentEl = null;
	modal = null;
	todoApi = "http://localhost:3000/task";

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
		const response = await fetch(this.todoApi);
		const tasks = await response.json();
		this.render(tasks);
	};

	render = (tasks) => {
		this.parentEl.innerHTML = `
			${tasks
				.map(
					({ id, name }) => `
						<div
							class="todo mt-2.5 flex w-full items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow">
							<span class="font-normal text-gray-700">${name}</span>
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
							class="btn-change-status bg-gray-400 hover:bg-gray-500 focus:ring-gray-100 mt-2.5 flex items-center gap-2 rounded-lg px-4 py-2.5 transition-all focus:outline-none focus:ring-4">
							<span class="font-medium text-white">Completed Todos 1</span
							><svg
								xmlns="http://www.w3.org/2000/svg"
								class="-rotate-90 h-4 w-4 transition-all"
								viewBox="0 0 512 512">
								<path
									class="fill-white"
									d="M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM376.9 294.6c4.5-4.2 7.1-10.1 7.1-16.3c0-12.3-10-22.3-22.3-22.3H304V160c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32v96H150.3C138 256 128 266 128 278.3c0 6.2 2.6 12.1 7.1 16.3l107.1 99.9c3.8 3.5 8.7 5.5 13.8 5.5s10.1-2 13.8-5.5l107.1-99.9z"></path>
							</svg>
				</button>
		`;
	};

	add = async (data) => {
		try {
			const options = this.getOptions("POST", data);
			const response = await fetch(this.todoApi, options);
			if (response.ok) {
				this.index();
			}
		} catch (e) {
			alert(e.message);
		} finally {
			this.modal.classList.add("hidden");
		}
	};

	update = async (data, id) => {
		console.log(data);
		console.log(id);
		try {
			const options = this.getOptions("PATCH", data);
			const response = await fetch(`${this.todoApi}/${id}`, options);
			if (response.ok) {
				this.index();
				alert("Updated successfully!");
			}
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
	completed = async () => {};
}
export default Todo;
