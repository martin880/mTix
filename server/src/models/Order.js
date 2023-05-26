module.exports = (sequelize, Sequelize) => {
	const Order = sequelize.define(
		"Orders",
		{
			order_number: { type: Sequelize.INTEGER },
			total_harga: { type: Sequelize.INTEGER },
		},
		{ paranoid: true }
	);
	return Order;
};
