const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserRoutes = require("./routes/UserRoutes");
const ProductRoutes = require("./routes/ProductRoutes");
const CategoryRoutes = require("./routes/CategoryRoutes");
const createServer = async () => {
	const app = express();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cors());
	//User Routes
	app.use("/v1/api/user", UserRoutes);
	app.use("/v1/api/product", ProductRoutes);
	app.use("/v1/api/category", CategoryRoutes);

	app.get("*", (_, res) => {
		res.status(404).json({ message: "You're at the wrong place" });
	});

	return app;
};

module.exports = createServer;
