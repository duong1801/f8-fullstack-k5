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

Number.prototype.getCurrency = function (currencyUnit) {
	return this.toLocaleString("vi-VN") + " " + currencyUnit;
};

String.prototype.getCurrency = function (currencyUnit) {
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

// Bài 3: Chuyển đổi mảng 1 chiều thành dạng lồng (nested)

var arr = [
	{
		id: 1,
		name: "Chuyên mục 1",
		parent: 0,
	},
	{
		id: 2,
		name: "Chuyên mục 2",
		parent: 0,
	},
	{
		id: 3,
		name: "Chuyên mục 3",
		parent: 0,
	},
	{
		id: 4,
		name: "Chuyên mục 2.1",
		parent: 2,
	},
	{
		id: 5,
		name: "Chuyên mục 2.2",
		parent: 2,
	},
	{
		id: 6,
		name: "Chuyên mục 2.3",
		parent: 2,
	},
	{
		id: 7,
		name: "Chuyên mục 3.1",
		parent: 3,
	},
	{
		id: 8,
		name: "Chuyên mục 3.2",
		parent: 3,
	},
	{
		id: 9,
		name: "Chuyên mục 3.3",
		parent: 3,
	},
	{
		id: 10,
		name: "Chuyên mục 2.2.1",
		parent: 5,
	},
	{
		id: 11,
		name: "Chuyên mục 2.2.2",
		parent: 5,
	},
];

function buildNestedMenu(arr, parentId = 0) {
	var result = [];

	for (var item of arr) {
		if (item.parent === parentId) {
			var children = buildNestedMenu(arr, item.id);
			if (children.length > 0) {
				item.children = children;
			}
			delete item.parent;
			result.push(item);
		}
	}

	return result;
}

var item2 = {
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
};

console.log(buildNestedMenu(arr));

// Bài 4: Viết lại vòng lặp reduce() trong Array bằng cách sử dụng Prototype trong Javascript

Array.prototype.reduce2 = function (callback, result) {
	var index = 0;

	if (!result) {
		result = this[0];
		index = 1;
	}

	for (; index < this.length; index++) {
		result = callback(result, this[index], index, this);
	}
	return result;
};

var numbers = [1, 2, 3, 4, 5, 6, 7, 8];

var total = numbers.reduce2(function (result, number) {
	return result + number;
});

console.log(total);
