/** @format */

// Bài 1 :
function calculateExpressionSum(...args) {
	let sum = 0;
	for (let i = 0; i < args.length; i++) {
		if (typeof args[i] !== "number" || isNaN(args[i])) {
			return "Dữ liệu không hợp lệ!";
		}
		sum += args[i];
	}
	return sum;
}

// Bài 2 : Viết 1 phương thức Prototype có tên là getCurrency có đối số truyền vào là đơn vị tiền tệ cần hiển thị
Object.prototype.getCurrency = function (unit) {
	console.log(this.constructor.name);
	if (Array.isArray(this) || this.constructor.name === "Boolean") {
		return `Số không hợp lệ`;
	}
	var value = +this;
	if (
		isNaN(value) ||
		value === Infinity ||
		typeof value !== "number" ||
		value === -Infinity
	) {
		return `Số không hợp lệ`;
	}
	return value.toLocaleString("en-US") + " " + unit;
};
//Case 1
var price = 12000;
console.log(price.getCurrency("đ")); //Hiển thị: 12,000 đ

//Case 2
var price = "12000000";
console.log(price.getCurrency("đ")); //Hiển thị: 12,000,000 đ

// Bài 3: Viết lại hàm push() trong Array. Đặt tên là push2()

Array.prototype.push2 = function (...params) {
	for (var item of params) {
		this[this.length] = item;
	}
	return this.length;
};

var arr = [1, 2];
console.log(arr.push([1, 2], 1));
console.log(arr);

// Bài 4: Viết lại vòng lặp filter trong Array. Đặt tên là filter2()

Array.prototype.filter2 = function (callback) {
	var result = [];
	for (var i = 0; i < this.length; i++) {
		$check = callback(this[i], i, this);
		if ($check) {
			result.push(this[i]);
		}
	}
	return result;
};

var numbers = [1, 2, 3, 4, 5, 6, 7];
var result = numbers.filter2(function (number, index, numbers) {
	return number > 3;
});

console.log(result);

// Bài 5 : Chuyển mảng sau thành dạng thẻ html select option

var categories = [
	{
		id: 1,
		name: "Chuyên mục 1",
	},
	{
		id: 2,
		name: "Chuyên mục 2",
		children: [
			{
				id: 4,
				name: "Chuyên mục 2.1",
			},
			{
				id: 5,
				name: "Chuyên mục 2.2",
				children: [
					{
						id: 10,
						name: "Chuyên mục 2.2.1",
					},
					{
						id: 11,
						name: "Chuyên mục 2.2.2",
					},
					{
						id: 12,
						name: "Chuyên mục 2.2.3",
					},
				],
			},
			{
				id: 6,
				name: "Chuyên mục 2.3",
			},
		],
	},
	{
		id: 3,
		name: "Chuyên mục 3",
		children: [
			{
				id: 7,
				name: "Chuyên mục 3.1",
			},
			{
				id: 8,
				name: "Chuyên mục 3.2",
			},
			{
				id: 9,
				name: "Chuyên mục 3.3",
			},
		],
	},
];
var box = document.getElementById("box");
var htmls = "<option value='0'>Chọn chuyên mục</option>";
function recursive(arr, depth = "") {
	arr?.forEach(function (item) {
		htmls += `
		<option value="${item.id}">${depth}${item.name}</option>
		`;
		if (item.children && item.children.length > 0) {
			recursive(item.children, depth + "--|");
		}
	});
	return htmls;
}

var htmls = recursive(categories);
box.innerHTML = htmls;
