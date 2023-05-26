const db = require("../models");
const sequelize = require("sequelize");

const orderController = {
	getAll: async (req, res) => {
		try {
			const order = await db.Order.findAll();
			return res.send(order);
		} catch (err) {
			console.log(err);
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	getById: async (req, res) => {
		const order = await db.Order.findOne({
			where: {
				id: req.params.id,
			},
		});
		return res.send(order);
	},
	insertOrder: async (req, res) => {
		try {
			const { order_number, total_harga } = req.body;
			await db.Order.create({
				order_number,
				total_harga,
			});
			return await db.Order.findAll().then((result) => {
				res.send(result);
			});
		} catch (error) {
			return res.status(500).send({
				message: error.message,
			});
		}
	},
	editOrder: async (req, res) => {
		try {
			const { order_number, total_harga } = req.body;
			await db.Order.update(
				{
					order_number,
					total_harga,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			);

			return await db.Order.findOne({
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
	deleteOrder: async (req, res) => {
		try {
			await db.Order.destroy({
				where: {
					// id: req.params.id,
					id: {
						[Op.eq]: req.params.id,
					},
				},
			});
			return await db.Order.findAll().then((result) => res.send(result));
		} catch (error) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},
};

module.exports = orderController;
