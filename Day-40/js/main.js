/** @format */

import { httpClient } from "./client.js"
import helper from "./helper.js"
import config from "./config.js"
httpClient.serverApi = config.serverApi
import validateForm from "./validate.js"
const root = document.querySelector("#root")
console.log(root)
const app = {
	start: function () {
		root.innerHTML = this.loginForm()
		this.addEvent()
	},
	registerForm: function () {
		return `	<div class="container mt-4">
        <h1 class="heading text-center">Register Form</h1>
				<div class="row">
					<form class="mt-4 register-form">
             <div class="mb-3 form-group" >
							<label for="exampleInputEmail1" class="form-label"
								>Email </label
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
						<button type="submit" class="btn btn-primary">Đăng nhập</button>
            	<button type="button" class="btn btn-success swich-register">Đăng ký</button>
					</form>
				</div>`
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
		})

		root.addEventListener("submit", (e) => {
			e.preventDefault()
			if (e.target.classList.contains("login-form")) {
				if (validateForm()) {
					console.log(e.target)
					const data = helper.encodeFormData(
						Object.fromEntries([...new FormData(e.target)])
					)
					console.log(data)
				}
			}

			if (e.target.classList.contains("register-form")) {
				console.log("object")
				if (validateForm(true)) {
					console.log(e.target)
					const data = helper.encodeFormData(
						Object.fromEntries([...new FormData(e.target)])
					)
					console.log(data)
				}
			}
		})
	},
}

app.start()
