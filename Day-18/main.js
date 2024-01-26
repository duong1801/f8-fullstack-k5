/** @format */

// Bài 1: Tính tiền taxi

var postage,
	distance = 121,
	price;

if (distance < 1) {
	price = 15000;
} else if (distance > 1 && distance <= 5) {
	price = 13500;
} else if (distance > 5) {
	price = 11000;
	if (distance > 120) {
		price = (price * 9) / 10;
	}
}

postage = distance * price;

console.log(postage);

postage = price * distance;

// Bài 2: Tính tiền điện

var elecNumber, price, pay;

if (price > 0 && price <= 50) {
	price = 1.678;
} else if ((price) => 51 && price <= 100) {
	price = 1.734;
} else if (price >= 101 && price <= 200) {
	price = 2.014;
} else if (price >= 201 && price <= 300) {
	price = 2.536;
} else if (price >= 301 && price <= 400) {
	price = 2.834;
} else {
	price = 2.927;
}
pay = price * elecNumber;
result = `Số tiền cần thanh toán là: ${pay} đ`;

// Bài 3: Tính giá trị biểu thức

//S= 1*2 + 2*3 + 3*4 + ... + n*(n+1)

var total = 0;
var n = 20;
for (; n > 0; n--) {
	total += n * (n + 1);
}

console.log(total);

// Bài 4: Viết hàm kiểm tra số nguyên tố

function checkPrime(number) {
	var result;
	if (number < 1) {
		result = `${number} không phải là số nguyên tố`;
	} else {
		var check = false;
		for (var i = 2; i < number; i++) {
			if (number % i === 0) {
				check = true;
				break;
			}
		}
		result = check
			? `${number} không phải là số nguyên tố`
			: `${number} là số nguyên tố`;
	}
	return result;
}
console.log(checkPrime(2));

// Bài 5: Vẽ tam giác số

var n = 4;
var counter = 0;
for (var row = 1; row <= n; row++) {
	for (var col = 1; col <= row; col++) {
		counter++;
		document.write(counter + " ");
	}
	document.write("<br>");
}

// Bài 6: Vẽ bàn cờ vua

document.write(`<div>`);
for (var row = 1; row <= 8; row++) {
	for (var col = 1; col <= 4; col++) {
		cellOdd = "white";
		cellEven = "black";

		if (row % 2 === 0) {
			[cellOdd, cellEven] = [cellEven, cellOdd];
		}
		document.write(`<span class = "${cellOdd}"></span>`);
		document.write(`<span class = "${cellEven}"></span>`);
	}
	document.write(`</br>`);
}
document.write(`</div>`);

//Bài 7: Vẽ bảng cửu chương

for (var i = 1; i <= 10; i++) {
	for (var j = 1; j <= 10; j++) {
		console.log(`${i} * ${j} = ${i * j}`);
	}
}

// Bài 8: Tính giá trị biểu thức không dùng vòng lặp

var total = 0;
function recursive(n) {
	if (n > 0) {
		total += 1 / n;
		return recursive(n - 1);
	}
	return total;
}

console.log(recursive(3));
