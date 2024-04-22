/** @format */
window.addEventListener("DOMContentLoaded", function () {
	const apiTodo = "https://api-auth-two.vercel.app/blogs"
	const usersListEl = document.querySelector(".comments-list")

	let loadingPage = 1

	const scrollLoadMore = async () => {
		try {
			const response = await fetch(`${apiTodo}?_page=${loadingPage}`)
			const data = await response.json()
			console.log(data.data)
			data?.data.forEach(({ title, content, userId }) => {
				const liEl = document.createElement("li")
				liEl.innerHTML = `
                    <h3>Tiêu đề: ${title}</h3>
                    <p>Nội dung: ${content}</p>
                    <p>tác giả: ${userId.name}</p>
                `

				usersListEl.appendChild(liEl)
			})
		} catch (error) {
			alert(error.message)
		}
	}

	scrollLoadMore()

	window.addEventListener("scroll", () => {
		rootEl = document.querySelector("html")
		const { scrollTop, scrollHeight, clientHeight } = rootEl
		if (scrollTop + clientHeight >= scrollHeight) {
			loadingPage++
			scrollLoadMore()
		}
	})
})
