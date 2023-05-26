"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js" &&
			file.indexOf(".test.js") === -1
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const user = require("./Users");
db.Token = require("./token")(sequelize, Sequelize);
db.Users = user(sequelize, Sequelize);
db.City = require("./Cities")(sequelize, Sequelize);
db.Theater = require("./Theaters")(sequelize, Sequelize);
db.Schedule = require("./Schedules")(sequelize, Sequelize);
db.Ticket = require("./Tickets")(sequelize, Sequelize);
db.Movie = require("./Movies")(sequelize, Sequelize);
db.Orderitems = require("./OrderItem")(sequelize, Sequelize);
db.Orders = require("./Order")(sequelize, Sequelize);

module.exports = db;

db.Theater.belongsTo(db.City, {
	foreignKey: "cityId",
});

db.Schedule.belongsTo(db.Theater, {
	foreignKey: "theaterId",
});

db.Schedule.belongsTo(db.Movie, {
	foreignKey: "movieId",
});

db.Ticket.belongsTo(db.Schedule, {
	foreignKey: "scheduleId",
});

db.Orderitems.belongsTo(db.Orders, {
	foreignKey: "orderId",
});

db.Ticket.belongsTo(db.Orderitems, {
	foreignKey: "ticketId",
});

db.Orders.belongsTo(db.Users, {
	foreignKey: "userId",
});

module.exports = db;
