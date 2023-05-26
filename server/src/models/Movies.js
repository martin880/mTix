module.exports = (sequelize, Sequelize) => {
	const Movies = sequelize.define("Movie", {
		name: { type: Sequelize.STRING },
		synopsis: { type: Sequelize.STRING },
		type: { type: Sequelize.STRING },
		duration: { type: Sequelize.INTEGER },
		producer: { type: Sequelize.STRING },
		director: { type: Sequelize.STRING },
		writer: { type: Sequelize.STRING },
		cast: { type: Sequelize.STRING },
		distributor: { type: Sequelize.STRING },
		website: { type: Sequelize.STRING },
		image_url: { type: Sequelize.STRING },
	});

	return Movies;
};
