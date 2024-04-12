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
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										viewBox="0 0 448 512">
										<path
											class="fill-white"
											d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"></path>
									</svg></button
								><button data-id="${id}" data-type="update"
									type="button"
									class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										viewBox="0 0 512 512"
										style="margin-right: -1px">
										<path
											class="fill-white"
											d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path>
									</svg></button
								><button data-id="${id}" data-type="completed"
									type="button"
									class="bg-gray-400 flex h-10 w-10 items-center justify-center rounded-lg hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										viewBox="0 0 576 512">
										<path
											class="fill-white"
											d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z"></path>
									</svg>
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
		try {
			const options = this.getOptions("PATCH", data);
			const response = await fetch(`${this.todoApi}/${id}`, options);
			if (response.ok) {
				this.index();
			}
		} catch (e) {
			alert(e.message);
		} finally {
			this.modal.classList.add("hidden");
		}
	};
}
export default Todo;
