const createServer = require("./server");
const http = require("http");
const { Sequelize } = require("sequelize");
const { start } = require("repl");
require("dotenv").config();

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		HOST: "localhost",
		dialect: "mssql",
	}
);

async function startServer() {
	const app = await createServer();
	http.createServer(app).listen(process.env.PORT || 8000, async () => {
		try {
			await sequelize.authenticate();
			console.log(`Server is running at port ${process.env.PORT}`);
		} catch (error) {
			console.log(error);
		}
	});
}

startServer();
