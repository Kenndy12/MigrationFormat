"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.belongsTo(models.Role, {
				foreignKey: "role_id",
			});
		}
	}
	User.init(
		{
			name: { type: DataTypes.STRING, allowNull: false },
			password: { type: DataTypes.STRING, allowNull: false },
			email: { type: DataTypes.STRING, allowNull: false },
			phone: { type: DataTypes.INTEGER, allowNull: false },
			role_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: "roles", key: "id" },
			},
		},
		{
			sequelize,
			modelName: "User",
			tableName: "users",
		}
	);
	return User;
};
