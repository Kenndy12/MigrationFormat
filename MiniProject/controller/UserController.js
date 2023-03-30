const { User, Role } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
	register: async (req, res) => {
		try {
			const { name, email, password, phone, role_id } = req.body;
			const hashedPassword = await bcrypt.hash(password, 12);
			const data = await User.create({
				name,
				email,
				password: hashedPassword,
				phone,
				role_id,
			});
			return res.status(200).json({ data, message: "success" });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error });
		}
	},

	login: async (req, res) => {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({
				where: {
					email: email,
				},
			});
			console.log(user);
			if (user) {
				const isPasswordCorrect = await bcrypt.compare(password, user.password);
				if (isPasswordCorrect) {
					const token = jwt.sign({ id: user.id }, "secret_passpharse", {
						expiresIn: "1h",
					});
					return res.status(200).json({ token });
				} else {
					res.status(400).json({ message: "Invalid credentials" });
				}
			} else {
				res.status(404).json({
					message: "User not found",
				});
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: error });
		}
	},

	getProfile: async (req, res) => {
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

			const msg =
				user.Role.name === "admin" ? "I am an admin" : "Im not an admin";
			return res.status(200).json({
				data: user,
				message: msg,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: error,
			});
		}
	},

	changePassword: async (req, res) => {
		try {
			const id = res.user.id;
			const {
				oldPassword,
				confirmOldPassword,
				newPassword,
				confirmNewPassword,
			} = req.body;

			const user = await User.findOne({
				where: {
					id: id,
				},
			});
			if (
				!(
					oldPassword === confirmOldPassword &&
					newPassword === confirmNewPassword
				)
			) {
				return res
					.status(500)
					.json({ message: "Old and new passwords dont match" });
			}

			const isPasswordCorrect = await bcrypt.compare(
				oldPassword,
				user.password
			);

			if (!isPasswordCorrect)
				return res.status(500).json({ message: "Password is incorrect" });

			const hashedPassword = await bcrypt.hash(newPassword, 12);

			await User.update(
				{ password: hashedPassword },
				{
					where: {
						id: id,
					},
				}
			);
			return res.status(200).json({ message: "Password succesfully changed" });
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: error,
			});
		}
	},
};
