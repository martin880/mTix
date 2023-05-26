module.exports = (sequelize, Sequelize) => {
	const Tickets = sequelize.define(
		"Ticket",
		{
			seat: { type: Sequelize.STRING },
			available: { type: Sequelize.STRING },
			schedule_id: { type: Sequelize.STRING },
		},
		{ paranoid: true }
	);
	return Tickets;
};
