/** @format */

import { httpClient } from "./client.js"
import helper from "./helper.js"
import config from "./config.js"
httpClient.serverApi = config.serverApi
import validateForm from "./validate.js"
const root = document.querySelector("#root")
const app = {
	isLogin: false,
	start: function () {
		this.render()
		this.addEvent()
	},
	profile: function () {
		return `<div class="container-fluid">
				<div class="row">
					<div class="col-12">
						<h2 class="heading">Chào mừng bạn quay trở lại</h2>
						<h3>Chào, <span class="profile-name">Loading...</span></h3>
						<button class="logout-btn btn btn-warning">Đăng xuất</button>
					</div>
				</div>`
	},
	render: function () {
		if (localStorage.getItem("tokens")) {
			try {
				const tokens = JSON.parse(localStorage.getItem("tokens"))
				if (tokens.accessToken) {
					this.isLogin = true
					this.sendRequestProfile()
				}
			} catch (e) {
				console.log(e.message)
			}
		}

		root.innerHTML = this.isLogin ? this.profile() : this.loginForm()
	},
	registerForm: function () {
		return `	<div class="container mt-4">
        <h1 class="heading text-center">Register Form</h1>
				<div class="row">
					<form class="mt-4 register-form">
             <div class="mb-3 form-group" >
							<label for="exampleInputEmail1" class="form-label"
								>Name </label
							>
							<input
								type="name"
                id="name"
                name="name"
								class="form-control"
								 />
                  <div class="invalid-feedback">
        
                 </div>
						</div>
						<div class="mb-3">
							<label for="exampleInputEmail1" class="form-label"
								>Email </label
							>
							<input
								type="email"
								class="form-control"
								id="email"
								name="email"
                />
                 <div class="invalid-feedback">
        
                 </div>
						</div>
        
						<div class="mb-3">
							<label for="exampleInputPassword1" class="form-label"
								>Mật khẩu</label
							>
							<input
								type="password"
								class="form-control"
								id="password"
                name="password"
                />
                   <div class="invalid-feedback">
        
                 </div>
						</div>

            
						<button type="submit" class="btn btn-primary btn-register">Đăng ký</button>
            		<button class="btn btn-primary d-none register-loading" type="button" disabled>
                    <span
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"></span>
                   Đăng ký
	           	</button>
            <button type="button" class="btn btn-success swich-login">Đăng nhập</button>
					</form>
				</div>`
	},
	loginForm: function () {
		return `<div class="container mt-4">
     <h1 class="heading text-center">Login Form</h1>
				<div class="row">
					<form class="mt-4 login-form">
						<div class="mb-3">
							<label for="exampleInputEmail1" class="form-label"
								>Email </label
							>
							<input
								type="email"
								class="form-control"
								id="email"
						    name="email" />
                 <div class="invalid-feedback">
        
                 </div>
						</div>
        
						<div class="mb-3">
							<label for="exampleInputPassword1" class="form-label"
								>Mật khẩu</label
							>
							<input
								type="password"
								class="form-control"
								id="password"
                 name="password" />
                 <div class="invalid-feedback">
        
                 </div>
						</div>
						<button type="submit" class="btn btn-primary btn-login">Đăng nhập</button>
            	<button class="btn btn-primary d-none register-loading" type="button" disabled>
                    <span
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"></span>
                   Đăng nhập
	           	</button>
            	<button type="button" class="btn btn-success swich-register">Đăng ký</button>
					</form>
				</div>`
	},
	sendRequestLogout: async function () {
		const { res, data } = await httpClient.post("/auth/logout")
		localStorage.removeItem("tokens")
		root.innerHTML = this.loginForm()
	},

	addEvent: function () {
		root.addEventListener("click", (e) => {
			if (e.target.classList.contains("swich-login")) {
				root.innerHTML = this.loginForm()
			}
			if (e.target.classList.contains("swich-register")) {
				// console.log("object")
				root.innerHTML = this.registerForm()
			}

			if (e.target.classList.contains("logout-btn")) {
				this.sendRequestLogout()
			}
		})

		root.addEventListener("submit", (e) => {
			e.preventDefault()
			if (e.target.classList.contains("login-form")) {
				if (validateForm()) {
					const btnLogin = document.querySelector(".btn-login")
					const btnLoginLoading = btnLogin.nextElementSibling
					const data = helper.encodeFormData(
						Object.fromEntries([...new FormData(e.target)])
					)
					btnLogin.classList.add("d-none")
					btnLoginLoading.classList.remove("d-none")
					this.sendRequestLogin(data, btnLogin, btnLoginLoading)
				}
			}

			if (e.target.classList.contains("register-form")) {
				if (validateForm(true)) {
					const btnRegister = document.querySelector(".btn-register")
					const btnRegisterLoading = btnRegister.nextElementSibling
					const data = helper.encodeFormData(
						Object.fromEntries([...new FormData(e.target)])
					)
					btnRegister.classList.add("d-none")
					btnRegisterLoading.classList.remove("d-none")
					this.sendRequestRegister(data, btnRegister, btnRegisterLoading)
				}
			}
		})
	},
	sendRequestLogin: async function (data, btnLogin, btnLoginLoading) {
		//gọi api login

		const { res: response, data: datas } = await httpClient.post(
			"/auth/login",
			data
		)

		//Thất bại --> Thông báo lỗi
		if (!response.ok) {
			alert("Email hoặc mật khẩu không chính xác")
			btnLogin.classList.remove("d-none")
			btnLoginLoading.classList.add("d-none")
			return
		}
		//Nếu thành công --> Lưu vào localStorage
		const tokens = {
			accessToken: datas.data.accessToken,
			refreshToken: datas.data.refreshToken,
		}
		localStorage.setItem("tokens", JSON.stringify(tokens))
		this.render()
	},

	sendRequestRegister: async function (data, btnRegister, btnRegisterLoading) {
		//gọi api login
		const { res: response, data: datas } = await httpClient.post(
			"/auth/register",
			data
		)

		if (!response.ok) {
			btnRegister.classList.remove("d-none")
			btnRegisterLoading.classList.add("d-none")
			alert("Có lỗi xảy ra,vui lòng thử lại")
			return
		}
		alert("Tạo tài khoản thành công")
		this.start()
	},
	sendRequestRefreshToken: async function (refreshToken) {
		try {
			const { res: response, data } = await httpClient.post(
				"/auth/refresh-token",
				{ refreshToken }
			)

			if (!response.ok) {
				throw new Error("Refresh Token Invalid")
			}
			return data
		} catch {
			return false
		}
	},
	sendRequestProfile: async function () {
		const { accessToken, refreshToken } = JSON.parse(
			localStorage.getItem("tokens")
		)

		httpClient.token = accessToken

		const { res: response, data } = await httpClient.get("/users/profile")

		if (!response.ok) {
			const newToken = await this.sendRequestRefreshToken(refreshToken)
			if (!newToken) {
				localStorage.removeItem("tokens")
				this.render()
			} else {
				localStorage.setItem("tokens", JSON.stringify(newToken))
				this.sendRequestProfile()
			}
			return
		}
		const profileNameEl = root.querySelector(".profile-name")
		profileNameEl.innerText = data.data.name
	},
}

app.start()
