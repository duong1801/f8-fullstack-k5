/** @format */

//Bài 1: Lấy kết quả giao giữa 2 mảng

var arrA = [1, 4, 3, 2];
var arrB = [5, 2, 6, 7, 1];

var result = [];
arrA.forEach(function (item) {
	if (arrB.includes(item)) {
		result.push(item);
	}
});
console.log(result);

// Bài 2: Làm phẳng array sau (Chuyển về mảng 1 chiều)
var arr = [0, 1, [2, 3], [4, 5, [6, [10, 11], 7]], [8, [9, 10, [11, 12]]]];
var result = [];
function flatArray(arr) {
	arr.forEach(function (item) {
		if (Array.isArray(item)) {
			return flatArray(item);
		}
		return result.push(item);
	});
	return result;
}

console.log(flatArray(arr));

// Bài 3: Tách phần tử trong mảng theo đúng kiểu dữ liệu

function separateByDataType(arr) {
	var result = {};

	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			var dataType = typeof arr[i][j];

			if (!result[dataType]) {
				result[dataType] = [];
			}
			result[dataType].push(arr[i][j]);
		}
	}
	console.log(result);

	return Object.values(result);
}

var arr = [
	["a", 1, true],
	["b", 2, false],
	[null, undefined, "string"],
];
console.log(separateByDataType(arr));

// Bài 4

var posts = [
	{
		title: "Tiêu đề bài viết 1",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam eveniet cumque, expedita delectus impedit culpa repellendus corporis nemo mollitia esse consequuntur. Expedita eum labore molestias. Commodi eum esse eius doloremque?",
		image_url:
			"https://images.unsplash.com/photo-1707343843982-f8275f3994c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
	},
	{
		title: "Tiêu đề bài viết 2",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam eveniet cumque, expedita delectus impedit culpa repellendus corporis nemo mollitia esse consequuntur. Expedita eum labore molestias. Commodi eum esse eius doloremque?",
		image_url:
			"https://images.unsplash.com/photo-1707343843982-f8275f3994c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
	},
	{
		title: "Tiêu đề bài viết 3",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam eveniet cumque, expedita delectus impedit culpa repellendus corporis nemo mollitia esse consequuntur. Expedita eum labore molestias. Commodi eum esse eius doloremque?",
		image_url:
			"https://images.unsplash.com/photo-1707343843982-f8275f3994c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
	},
];

var arr = [0, 1, [2, 3], [4, 5, [6, [10, 11], 7]], [8, [9, 10, [11, 12]]]];

var newArr = arr
	.toString()
	.split(",")
	.map(function (number) {
		return +number;
	});

console.log(newArr);
