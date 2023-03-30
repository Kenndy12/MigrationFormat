const { Product } = require("../models");

module.exports = {
	listProduct: async (req, res) => {
		try {
			const allProduct = await Product.findAll();
			return res.status(200).json({ product: allProduct });
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	},

	createProduct: async (req, res) => {
		try {
			const { name, price, productLink, category_id } = req.body;
			const product = await Product.create({
				name,
				price,
				productLink,
				category_id,
			});
			return res
				.status(200)
				.json({ product, message: "Product successfully created" });
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	},
};
