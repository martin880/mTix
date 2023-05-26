const db = require("../models");
const sequelize = require("sequelize");

const orderitemController = {
	getAll: async (req, res) => {
		try {
			const orderitem = await db.Orderitems.findAll();
			return res.send(orderitem);
		} catch (err) {
			console.log(err);
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	getById: async (req, res) => {
		const orderitem = await db.Orderitems.findOne({
			where: {
				id: req.params.id,
			},
		});
		return res.send(orderitem);
	},
	insertOrderitems: async (req, res) => {
		try {
			const { ticket_id, order_id } = req.body;
			await db.Orderitems.create({
				ticket_id,
				order_id,
			});
			return await db.Orderitems.findAll().then((result) => {
				res.send(result);
			});
		} catch (error) {
			return res.status(500).send({
				message: error.message,
			});
		}
	},
	editOrderitems: async (req, res) => {
		try {
			const { ticket_id, order_id } = req.body;
			await db.Orderitems.update(
				{
					ticket_id,
					order_id,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			);

			return await db.Orderitems.findOne({
				where: {
					id: req.params.id,
				},
			}).then((result) => res.send(result));
		} catch (err) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},
	deleteOrderitems: async (req, res) => {
		try {
			await db.Orderitems.destroy({
				where: {
					// id: req.params.id,
					id: {
						[Op.eq]: req.params.id,
					},
				},
			});
			return await db.Orderitems.findAll().then((result) => res.send(result));
		} catch (error) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},
};

module.exports = orderitemController;
