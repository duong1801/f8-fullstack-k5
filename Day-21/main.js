/** @format */
// Bài 1: Cho trước 1 mảng số nguyên, yêu cầu tìm số lớn nhất, nhỏ nhất trong mảng và vị trí
var numbers = [1, 2, 3, 4, 6, 9];

var min = numbers[0],
	max = numbers[0];

var positionMax = 0,
	positionMin = 0;
for (var i = 0; i < numbers.length; i++) {
	if (numbers[i] > max) {
		max = numbers[i];
		positionMax = i;
	} else if (numbers[i] < min) {
		min = numbers[i];
		positionMin = i;
	}
}

document.write(`Số lớn nhất trong mảng là ${max} ở vị trí ${positionMax} <br>`);
document.write(`Số bé nhất trong mảng là ${min} ở vị trí ${positionMin}`);

// Bài 2: Cho trước 1 mảng số nguyên, tính trung bình các số nguyên tố trong mảng. Nếu trong mảng không có số nguyên tố thì hiển thị “Không có số nguyên tố”

function isPrime(number) {
	if (number < 2) {
		return false;
	}
	for (var i = 2; i <= Math.sqrt(number); i++) {
		if (number % i === 0) {
			return false;
		}
	}
	return true;
}

function averageOfPrimes(arr) {
	var sum = 0;
	var count = 0;

	for (var i = 0; i < arr.length; i++) {
		if (isPrime(arr[i])) {
			sum += arr[i];
			count++;
		}
	}

	if (count === 0) {
		console.log("Không có số nguyên tố");
		return;
	}

	const average = sum / count;
	console.log("Trung bình các số nguyên tố là:", average);
}

var numbers = [2, 3, 5, 7, 10, 12];

averageOfPrimes(numbers);

// Bài 3: Cho trước 1 mảng bất kỳ, nếu trong mảng có các phần tử trùng nhau thì chỉ giữa lại 1 (Gọi là lọc trùng). In ra mảng sau khi đã xử lý

var array = [1, 2, 6, 6, 3, 1, 3, 5, 7, 6];

var arrUnique = [];

for (var i = 0; i < array.length; i++) {
	var isUnique = false;
	for (var j = 0; j < arrUnique.length; j++) {
		if (array[i] === arrUnique[j]) {
			isUnique = true;
			break;
		}
	}
	if (!isUnique) {
		arrUnique[arrUnique.length] = array[i];
	}
}

console.log(arrUnique);

// Bài 04

var numbers = [5, 2, 11, 15, 1, 9, 8, 10];
var element = 4;

for (var i = 0; i < numbers.length - 1; i++) {
	for (var j = 0; j < numbers.length - 1; j++) {
		if (numbers[j] > numbers[j + 1]) {
			var temp = numbers[j];
			numbers[j] = numbers[j + 1];
			numbers[j + 1] = temp;
		}
	}
}

console.log(numbers);

function insertElement(array, element, index) {
	array[array.length] = 0;
	for (var i = array.length - 2; i >= index; i--) {
		array[i + 1] = array[i];
	}
	array[index] = element;
}

insertElement(numbers, 4, 3);
console.log(numbers);
