module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("Users", {
		name: Sequelize.STRING,
		email: Sequelize.STRING,
		password: Sequelize.STRING,
		address: Sequelize.STRING,
	});
	return User;
};
