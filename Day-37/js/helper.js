/** @format */

const helper = {
	encodeFormData: (data) => {
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				data[key] = data[key].replace(/</g, "&lt;").replace(/>/g, "&gt;");
			}
		}
		return data;
	},
};
export default helper;
