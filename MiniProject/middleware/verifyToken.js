const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
	let token = req.headers.authorization;
	if (!token) {
		return res.status(403).json({
			message: "No Token found!",
		});
	}

	if (token.toLowerCase().startsWith("bearer")) {
		token = token.slice("bearer".length).trim();
	}

	try {
		const jwtPayload = jwt.verify(token, "secret_passpharse");
		if (!jwtPayload) {
			return res.status(403).json({
				message: "No user found!",
			});
		}
		res.user = {
			id: jwtPayload.id,
		};
		next();
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
};

module.exports = checkToken;
