/** @format */
// Bài 1:
var errors = {
	name: {
		required: "Vui lòng nhập họ tên",
		min: "Họ tên phải từ 5 ký tự",
	},
	email: {
		email: "Định dạng email không hợp lệ",
		unique: "Email đã có người sử dụng",
		required: "Vui lòng nhập địa chỉ email",
	},
	password: {
		required: "Vui lòng nhập mật khẩu",
		same: "Mật khẩu phải khớp với mật khẩu nhập lại",
	},
};

function getError(field) {
	var key = field,
		subKey = "required";

	if (field.includes(".")) {
		keyArr = field.split(".");
		key = keyArr[0];
		subKey = keyArr[1];
	}

	return errors[key][subKey]
		? errors[key][subKey]
		: "Kiểm tra lại field nhập vào!";
}

console.log(getError("name"));
console.log(getError("name.min"));
console.log(getError("name.same"));

console.log(getError("email"));
console.log(getError("email.unique"));  

// Bài 2:

function Customer(name, age, address) {
	this.name = name;
	this.age = age;
	this.address = address;
}

var customer = new Customer("Duong", 18, "HBT - HN");
console.log(customer);

const customers = [
	{ name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
	{ name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
	{ name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

function createCustomers(arr) {
	var newArr = arr.map(function (customer) {
		return { ...customer, shortName: customer.name };
	});
	return newArr.sort(function (a, b) {
		if (a.age < b.age) {
			return -1;
		}
	});
}

const result = createCustomers(customers);
console.log(result);

// Bài 3:

function User(name, password, email) {
	this.name = name;
	this.password = password;
	this.email = email;
}

const data = [];

function handleRegister(name, password, email) {
	if (!name || !password || !email) {
		console.log("Thông tin không đầy đủ, vui lòng kiểm tra lại.");
		return;
	}

	const existingUsers = data.filter((user) => user.email === email);
	if (existingUsers.length > 0) {
		console.log("Email đã tồn tại.");
		return existingUsers;
	}

	const newUser = new User(name, password, email);
	data.push(newUser);
	return newUser;
}

function handleLogin(email, password) {
	const user = data.find(
		(user) => user.email === email && user.password === password
	);
	if (user) {
		return user;
	} else {
		console.log("Thông tin đăng nhập không hợp lệ.");
		return;
	}
}

const dataRegister1 = handleRegister(
	"Nguyen Van A",
	"123456",
	"nguyenvana@email.com"
);
const dataRegister2 = handleRegister(
	"Nguyen Van B",
	"1234567",
	"nguyenvanb@email.com"
);

const dataLogin = handleLogin("nguyenvanb@email.com", "1234567");

console.log("data =", data);
console.log("dataLogin =", dataLogin);
