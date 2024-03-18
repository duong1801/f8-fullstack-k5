/** @format */
var root = document.querySelector("#root");
var tableProducts = document.querySelector(".list-product");
var cart = JSON.parse(localStorage.getItem("cart")) || [];
var totalAmount = 0;
var totalQuantity = 0;
var products = [
	{ id: 1, name: "Sản phẩm 1", price: 10000 },
	{ id: 2, name: "Sản phẩm 2", price: 20000 },
	{ id: 3, name: "Sản phẩm 3", price: 30000 },
	{ id: 4, name: "Sản phẩm 4", price: 40000 },
];
var Blue = {
	createElement: function (tag, attributes = {}, ...children) {
		var element = document.createElement(tag);
		if (children.length) {
			children.forEach((item) => {
				element.append(item);
			});
		}

		if (Object.keys(attributes).length) {
			Object.keys(attributes).forEach((key) => {
				if (key.startsWith("on")) {
					var event = key.replace("on", "").toLocaleLowerCase();
					element.addEventListener(event, attributes[key]);
				} else if (key.startsWith("data")) {
					var dataset = key.replace("data-", "");
					element.dataset[dataset] = attributes[key];
				} else {
					element.setAttribute(key, attributes[key]);
				}
			});
		}
		return element;
	},
};
var textEmptyCart = Blue.createElement(
	"p",
	{ class: "text-empty-cart" },
	"Không có sản phẩm nào trong giỏ hàng"
);
function getProductById(id, arr = []) {
	var product = arr.find(function (product) {
		return product.id === id;
	});
	return product;
}

function handleAddToCart(event, id) {
	// var cart = JSON.parse(localStorage.getItem("cart")) || [];
	var product = getProductById(id, products);
	var quantity = +event.target.previousElementSibling.value;
	var cartItem = { ...product, quantity: quantity };

	if (cart.length === 0) {
		cart.push(cartItem);
		renderCart();
		if (textEmptyCart) {
			textEmptyCart.remove();
		}
		var totalQuantityEl = document.querySelector(".total-quantity");
		var totalAmountEl = totalQuantityEl.nextElementSibling;
		totalAmount = cartItem.quantity * cartItem.price;
		totalQuantity = cartItem.quantity;
		totalAmountEl.innerText = totalAmount;
		totalQuantityEl.innerText = totalQuantity;
	} else {
		var totalEl = document.querySelector(".total-quantity").parentElement;
		var check = cart.some((product) => product.id === id);
		if (!check) {
			cart.push(cartItem);
			tbodyCartTable = document.querySelector(".table-cart tbody");
			if (tbodyCartTable) {
				var tr = Blue.createElement(
					"tr",
					{},
					Blue.createElement(
						"td",
						{
							class: "ordinal-number",
						},
						cart.length
					),
					Blue.createElement("td", {}, cartItem.name),
					Blue.createElement("td", {}, cartItem.price),
					Blue.createElement(
						"td",
						{},
						Blue.createElement("input", {
							type: "number",
							"data-id": cartItem.id,
							value: cartItem.quantity,
						})
					),
					Blue.createElement("td", {}, cartItem.price * cartItem.quantity),
					Blue.createElement(
						"td",
						{},
						Blue.createElement(
							"button",
							{
								onClick: function (event) {
									handleRemoveItemCart(event, product.id);
								},
							},
							"Xoá"
						)
					)
				);
				tbodyCartTable.insertBefore(tr, totalEl);
			}
		} else {
			var productUpdate = getProductById(id, cart);
			index = cart.indexOf(productUpdate);
			cart[index].quantity += +quantity;
			var inputUpdate = document.querySelector(`[data-id="${id}"]`);
			var newQuantity = cart[index].quantity;
			inputUpdate.value = newQuantity;
			var amount = inputUpdate.parentElement.nextElementSibling;
			amount.innerText = newQuantity * productUpdate.price;
		}
		var totalQuantityEl = document.querySelector(".total-quantity");
		var totalAmountEl = totalQuantityEl.nextElementSibling;
		totalAmount += cartItem.quantity * cartItem.price;

		totalQuantity += cartItem.quantity;
		totalAmountEl.innerText = totalAmount;
		totalQuantityEl.innerText = totalQuantity;
	}
	localStorage.setItem("cart", JSON.stringify(cart));
}

function handleRemoveItemCart(event, id) {
	var checkRemoveItem = confirm("are you sure you want to remove?");
	if (checkRemoveItem) {
		if (cart.length) {
			var itemRemove = event.target.parentElement.parentElement;
			var productRemove = getProductById(id, cart);
			totalAmount -= productRemove.price * productRemove.quantity;
			totalQuantity -= productRemove.quantity;
			var totalQuantityEl = document.querySelector(".total-quantity");
			var totalAmountEl = totalQuantityEl.nextElementSibling;
			totalAmountEl.innerText = totalAmount;
			totalQuantityEl.innerText = totalQuantity;
			var indexProductRemove = cart.indexOf(productRemove);
			cart.splice(indexProductRemove, 1);
			itemRemove.remove();
		}
		if (cart.length === 0) {
			var tableCart = document.querySelector(".table-cart");
			var callToActionGroups = document.querySelector(".call-to-action-groups");
			if (tableCart && callToActionGroups) {
				tableCart.remove();
				callToActionGroups.remove();
				root.appendChild(textEmptyCart);
			}
		}
		var ordinalNumbers = document.querySelectorAll(".ordinal-number");
		ordinalNumbers?.forEach(function (ordinalNumber, index) {
			ordinalNumber.innerText = index + 1;
		});
		localStorage.setItem("cart", JSON.stringify(cart));
		alert("remove item successfully!");
	}
}

function handleRemoveCart() {
	var checkRemoveItemAll = confirm("are you sure you want to remove all?");
	if (checkRemoveItemAll) {
		var tableCart = document.querySelector(".table-cart");
		var callToActionGroups = document.querySelector(".call-to-action-groups");
		if (tableCart && callToActionGroups) {
			tableCart.remove();
			callToActionGroups.remove();
			cart = [];
			localStorage.removeItem("cart");
			root.appendChild(textEmptyCart);
			totalAmount = 0;
			totalQuantity = 0;
		}

		alert("remove cart successfully!");
	}
}

function handleUpdateCart() {
	var inputsWithDataId = document.querySelectorAll(
		".table-cart input[data-id]"
	);
	totalAmount = 0;
	totalQuantity = 0;
	inputsWithDataId.forEach(function (input) {
		var id = +input.dataset.id;
		var newQuantity = +input.value;
		var productUpdate = getProductById(id, cart);
		var item = input.parentElement.parentElement;
		var amountEl = input.parentElement.nextElementSibling;
		var amount = productUpdate.price * newQuantity;
		var indexUpdate = cart.indexOf(productUpdate);
		if (newQuantity != 0) {
			input.value = newQuantity;
			amountEl.innerText = amount;
			cart[indexUpdate].quantity = newQuantity;
			totalAmount += amount;
			totalQuantity += newQuantity;
		} else {
			item.remove();
			cart.splice(indexUpdate, 1);
		}

		localStorage.setItem("cart", JSON.stringify(cart));
	});
	var totalQuantityEl = document.querySelector(".total-quantity");
	var totalAmountEl = totalQuantityEl.nextElementSibling;
	totalAmountEl.innerText = totalAmount;
	totalQuantityEl.innerText = totalQuantity;
	alert("Updated cart successfully!");
}

var productElement = products.map(function (product, index) {
	return Blue.createElement(
		"tr",
		{},
		Blue.createElement("td", {}, index + 1),
		Blue.createElement("td", {}, product.name),
		Blue.createElement("td", {}, product.price),
		Blue.createElement(
			"td",
			{},
			Blue.createElement("input", {
				type: "number",
				id: "quantity_1",
				value: "1",
				style: "width: 90%; display: block; margin: 0 auto",
			}),

			Blue.createElement(
				"button",
				{
					type: "button",
					style: "width: 100%",
					onClick: function (event) {
						handleAddToCart(event, product.id);
					},
				},
				"Thêm giỏ hàng"
			)
		)
	);
});

var listProducts = Blue.createElement("tbody", {}, ...productElement);
tableProducts.append(listProducts);

if (!cart?.length || cart[0]?.quantity === 0) {
	var textEmptyCart = Blue.createElement(
		"p",
		{ class: "text-empty-cart" },
		"Không có sản phẩm nào trong giỏ hàng"
	);
	root.appendChild(textEmptyCart);
} else {
	renderCart();
}

function renderCart() {
	var cartElement = cart.map(function (product, index) {
		totalAmount += product.price * product.quantity;
		totalQuantity += product.quantity;
		return Blue.createElement(
			"tr",
			{},
			Blue.createElement(
				"td",
				{
					class: "ordinal-number",
				},
				index + 1
			),
			Blue.createElement("td", {}, product.name),
			Blue.createElement("td", {}, product.price),
			Blue.createElement(
				"td",
				{},
				Blue.createElement("input", {
					type: "number",
					"data-id": product.id,
					value: product.quantity,
				})
			),
			Blue.createElement("td", {}, product.price * product.quantity),
			Blue.createElement(
				"td",
				{},
				Blue.createElement(
					"button",
					{
						onClick: function (event) {
							handleRemoveItemCart(event, product.id);
						},
					},
					"Xoá"
				)
			)
		);
	});
	var totalAmountEl = Blue.createElement(
		"tr",
		{},
		Blue.createElement("td", { colspan: 3 }, "Tổng"),
		Blue.createElement("td", { class: "total-quantity" }, totalQuantity),
		Blue.createElement("td", { colspan: 2 }, totalAmount)
	);
	var tbodyEL = Blue.createElement("tbody", {}, ...cartElement, totalAmountEl);
	var tableCart = Blue.createElement(
		"table",
		{
			class: "table-cart",
			cellpadding: "0",
			cellspacing: "0",
			width: "100%",
			border: "1",
		},
		Blue.createElement(
			"thead",
			{},
			Blue.createElement(
				"tr",
				{},
				Blue.createElement("td", { width: "5%" }, "STT"),
				Blue.createElement("td", {}, "Tên sản phẩm"),
				Blue.createElement("td", { width: "20%" }, "Giá"),
				Blue.createElement("td", { width: "20%" }, "Số lượng"),
				Blue.createElement("td", { width: "20%" }, "Thành tiền"),
				Blue.createElement("td", { width: "5%" }, "Xoá")
			)
		),
		tbodyEL
	);

	root.append(tableCart);
	var callToActionGroups = Blue.createElement(
		"div",
		{
			class: "call-to-action-groups",
		},
		Blue.createElement("hr", {}),
		Blue.createElement(
			"button",
			{
				type: "button",
				id: "update_cart",
				onClick: function () {
					handleUpdateCart();
				},
			},
			"Cập nhật giỏ hàng"
		),
		Blue.createElement(
			"button",
			{
				type: "button",
				id: "delete_cart",
				onClick: function () {
					handleRemoveCart();
				},
			},
			"Xoá giỏ hàng"
		)
	);
	root.appendChild(callToActionGroups);
}
