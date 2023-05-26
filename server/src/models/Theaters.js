module.exports = (sequelize, Sequelize) => {
	const Theaters = sequelize.define("Theater", {
		name: { type: Sequelize.STRING },
		address: { type: Sequelize.STRING },
		city_id: {
			type: Sequelize.INTEGER,
		},
	});
	return Theaters;
};
