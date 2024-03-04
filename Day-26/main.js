/** @format */
const bgSecondary = "bg-secondary-subtle";

var btnOpen = document.querySelector(".open-modal");
var btnClose = document.querySelector(".close-modal");
var overlay = document.querySelector(".overlay");
var titleLogin = document.querySelector(".title-login");
var titleRegister = document.querySelector(".title-register");
var formLogin = document.querySelector(".form-login");
var formRegister = document.querySelector(".form-register");
var inputsLogin = formLogin.querySelectorAll("input");
var inputRegister = formRegister.querySelectorAll("input");
var iconShowPass = document.querySelectorAll(".icon-open");
var iconClosePass = document.querySelectorAll(".icon-close");
var isLogin = true;
var isShowPass = false;

//handle open and close modal
function openModal() {
	overlay.classList.add("open");
}

function closeModal() {
	overlay.classList.remove("open");
}

btnOpen.addEventListener("click", openModal);
btnClose.addEventListener("click", closeModal);

document.onkeyup = function (e) {
	if (e.key === "Escape") {
		closeModal();
	}
};

//handle when blur input

for (var i = 0; i < inputsLogin.length; i++) {
	inputsLogin[i].addEventListener("blur", function () {
		validation(".form-login", 'input[name="email"]', 'input[name="password"]');
	});
}

for (var i = 0; i < inputRegister.length; i++) {
	inputRegister[i].addEventListener("blur", function () {
		validation(
			".form-register",
			'input[name="name"]',
			'input[name="email"]',
			'input[name="password"]'
		);
	});
}

//handle swich tap

titleLogin.addEventListener("click", function () {
	isLogin = true;
	swichTap(isLogin);
});

titleRegister.addEventListener("click", function () {
	isLogin = false;
	swichTap(isLogin);
});

//handle submit form
formLogin.addEventListener("submit", function (e) {
	e.preventDefault();
	validation(".form-login", 'input[name="email"]', 'input[name="password"]');
});

formRegister.addEventListener("submit", function (e) {
	e.preventDefault();
	validation(
		".form-register",
		'input[name="name"]',
		'input[name="email"]',
		'input[name="password"]'
	);
});

//handle show/hidden password fields

for (let index = 0; index < iconShowPass.length; index++) {
	const element = iconShowPass[index];
	element.addEventListener("click", function () {
		var iconClose = element.nextElementSibling;
		var input = element.parentElement.nextElementSibling;
		element.style.display = "none";
		iconClose.style.display = "block";
		input.type = "text";
	});
}

for (let index = 0; index < iconClosePass.length; index++) {
	const element = iconClosePass[index];
	element.addEventListener("click", function () {
		var iconOpen = element.previousElementSibling;
		var input = element.parentElement.nextElementSibling;
		element.style.display = "none";
		iconOpen.style.display = "block";
		input.type = "password";
	});
}

//validate
function validation(formSelector = "", ...inputSelectors) {
	var formParent = document.querySelector(formSelector);
	inputSelectors?.forEach(function (selector) {
		switch (selector) {
			case 'input[name="name"]':
				var inputName = formParent.querySelector(selector);
				var inputValue = inputName.value;
				var validFeedback = inputName.nextElementSibling;
				if (!inputValue) {
					inputName.classList.add("is-invalid");
					validFeedback.innerHTML = "Vui lòng nhập tên";
				} else {
					inputName.classList.remove("is-invalid");
					validFeedback.innerHTML = "";
				}
				break;

			case 'input[name="email"]':
				var inputEmail = formParent.querySelector(selector);
				var inputValue = inputEmail.value;
				var validFeedback = inputEmail.nextElementSibling;
				if (!inputValue) {
					inputEmail.classList.add("is-invalid");
					validFeedback.innerHTML = "Vui lòng nhập Email";
				} else if (!inputValue.includes("@")) {
					inputEmail.classList.add("is-invalid");
					validFeedback.innerHTML = "Email không đúng định dạng";
				} else {
					inputEmail.classList.remove("is-invalid");
					validFeedback.innerHTML = "";
				}
				break;

			case 'input[name="password"]':
				var inputPass = formParent.querySelector(selector);
				var inputValue = inputPass.value;
				var validFeedback = inputPass.nextElementSibling;
				if (!inputValue) {
					inputPass.classList.add("is-invalid");
					validFeedback.innerHTML = "Vui lòng nhập mật khẩu";
				} else if (inputValue.length < 6) {
					inputPass.classList.add("is-invalid");
					validFeedback.innerHTML = "Mật khẩu phải có tối thiểu 6 kí tự";
				} else {
					inputPass.classList.remove("is-invalid");
					validFeedback.innerHTML = "";
				}
				break;
			default:
				break;
		}
	});
}

function resetForm(formSelector = "") {
	var formParent = document.querySelector(formSelector);
	var inputsForm = formParent.querySelectorAll("input");
	for (var i = 0; i < inputsForm.length; i++) {
		var checkInValid = inputsForm[i].classList.contains("is-invalid");
		var validFeedback = inputsForm[i].nextElementSibling;
		inputsForm[i].value = "";
		if (checkInValid) {
			inputsForm[i].classList.remove("is-invalid");
			validFeedback.innerHTML = "";
		}
	}
}

function swichTap(isLogin = false) {
	if (isLogin) {
		//swich color title
		titleRegister.classList.remove(bgSecondary);
		titleLogin.classList.add(bgSecondary);

		//swich form
		formRegister.classList.remove("d-block");
		formLogin.classList.remove("d-none");
		resetForm(".form-register");
	} else {
		//swich color title
		titleLogin.classList.remove(bgSecondary);
		titleRegister.classList.add(bgSecondary);

		//swich form
		formLogin.classList.add("d-none");
		formRegister.classList.add("d-block");
		resetForm(".form-login");
	}
}
