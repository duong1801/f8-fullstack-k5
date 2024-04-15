/** @format */
window.addEventListener("DOMContentLoaded", function () {
	const apiTodo = "https://jsonplaceholder.typicode.com/comments";
	const usersListEl = document.querySelector(".comments-list");

	let loadingPage = 1;

	const scrollLoadMore = async () => {
		try {
			const response = await fetch(`${apiTodo}?_page=${loadingPage}`);
			const data = await response.json();
			console.log(data);
			data.forEach(({ name, body, email }) => {
				const liEl = document.createElement("li");
				liEl.innerHTML = `
                    <h3>Name: ${name}</h3>
                    <p>Content: ${body}</p>
                    <p>email: ${email}</p>
                `;

				usersListEl.appendChild(liEl);
			});
		} catch (error) {
			alert(error.message);
		}
	};

	scrollLoadMore();

	window.addEventListener("scroll", () => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
		console.log(scrollTop, scrollHeight, clientHeight);
		if (scrollTop + clientHeight >= scrollHeight) {
			loadingPage++;
			console.log(loadingPage);
			scrollLoadMore();
		}
	});
});
