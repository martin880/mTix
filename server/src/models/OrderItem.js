module.exports = (sequelize, Sequelize) => {
	const OrderItem = sequelize.define(
		"Orderitems",
		{
			ticket_id: { type: Sequelize.INTEGER },
			order_id: { type: Sequelize.INTEGER },
		},
		{ paranoid: true }
	);
	return OrderItem;
};
