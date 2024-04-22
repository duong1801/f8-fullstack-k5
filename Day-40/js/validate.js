/** @format */

function validateForm(isFieldName = false) {
	const email = document.getElementById("email")
	const password = document.getElementById("password")

	const emailValue = email.value
	const passwordValue = password.value
	let result = true

	if (isFieldName) {
		let name = document.getElementById("name")
		const nameValue = name.value
		if (!nameValue) {
			name.nextElementSibling.innerText = "Tên không được để trống"
			name.nextElementSibling.style.display = "block"
			result = false
		} else if (nameValue.length < 2) {
			name.nextElementSibling.innerText = "Tên phải tối thiểu có 2 kí tự"
			name.nextElementSibling.style.display = "block"
			result = false
		} else {
			name.nextElementSibling.innerText = ""
			name.nextElementSibling.style.display = "none"
		}
	}

	if (!emailValue) {
		email.nextElementSibling.innerText = "Email không được để trống"
		email.nextElementSibling.style.display = "block"
		result = false
	} else {
		email.nextElementSibling.innerText = ""
		email.nextElementSibling.style.display = "none"
	}

	if (!passwordValue) {
		password.nextElementSibling.innerText = "Mật khẩu không được để trống"
		password.nextElementSibling.style.display = "block"
		result = false
	} else if (passwordValue.length < 8) {
		password.nextElementSibling.innerText = "Mật khẩu phải chứa ít nhất 8 ký tự"
		password.nextElementSibling.style.display = "block"
		result = false
	} else {
		password.nextElementSibling.innerText = ""
		password.nextElementSibling.style.display = "none"
	}

	return result
}

export default validateForm
