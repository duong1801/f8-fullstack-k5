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

Object.prototype.getCurrency = function (currencyUnit) {
	var numberValue = parseFloat(this);
	if (!isNaN(numberValue)) {
		return numberValue.toLocaleString("vi-VN") + " " + currencyUnit;
	} else {
		return "Invalid number";
	}
};

var price1 = 12000;
console.log(price1.getCurrency("đ")); // Hiển thị: 12,000 đ

var price2 = "12000000";
console.log(price2.getCurrency("đ")); // Hiển thị: 12,000,000 đ

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
		$check = callback(this[i], i, this[i]);
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
function recusive(arr, depth = "") {
	arr.forEach(function (item) {
		htmls += `
		<option value="${item.id}">${depth}${item.name}</option>
		`;
		if (item.children && item.children.length > 0) {
			recusive(item.children, depth + "--|");
		}
	});
	return htmls;
}

var htmls = recusive(categories);
box.innerHTML = htmls;
