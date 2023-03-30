const { Category, User, Role } = require("../models");

module.exports = {
	listCategory: async (req, res) => {
		try {
			const id = res.user.id;
			const user = await User.findOne({
				include: {
					model: Role,
					as: "Role",
				},
				where: {
					id: id,
				},
			});
			const isAdmin = user.Role.name === "admin" ? true : false;

			if (isAdmin) {
				const categories = await Category.findAll();
				return res.status(200).json({ categories, message: "I am admin" });
			} else {
				return res.status(201).json({ message: "Not admin" });
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	createCategory: async (req, res) => {
		try {
			const id = res.user.id;
			const user = await User.findOne({
				include: {
					model: Role,
					as: "Role",
				},
				where: {
					id: id,
				},
			});
			const isAdmin = user.Role.name === "admin" ? true : false;

			if (isAdmin) {
				const { categoryName } = req.body;
				const createdCategory = await Category.create({ name: categoryName });
				return res
					.status(200)
					.json({ createdCategory, message: "Category created" });
			} else {
				return res.status(201).json({ message: "Not admin" });
			}
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	},
};
