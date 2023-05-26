module.exports = (sequelize, Sequelize) => {
	const Schedules = sequelize.define("Schedule", {
		movie_id: {
			type: Sequelize.INTEGER,
		},
		theater_id: {
			type: Sequelize.INTEGER,
		},
		schedule: {
			type: Sequelize.DATE,
		},
		studio: {
			type: Sequelize.ENUM("1", "2", "3", "4"),
		},
		price: {
			type: Sequelize.INTEGER,
		},
	});
	return Schedules;
};
