module.exports = (sequelize, Sequelize) => {
	const Cities = sequelize.define("City", {
		name: { type: Sequelize.STRING },
	});

	return Cities;
};
