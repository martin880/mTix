const db = require("../models");
const sequelize = require("sequelize");

const ticketController = {
	getAll: async (req, res) => {
		try {
			const ticket = await db.Ticket.findAll();
			return res.send(ticket);
		} catch (err) {
			console.log(err);
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	getById: async (req, res) => {
		const ticket = await db.Ticket.findOne({
			where: {
				id: req.params.id,
			},
		});
		return res.send(ticket);
	},
	insertTicket: async (req, res) => {
		try {
			const { seat, available, schedule_id } = req.body;
			await db.Ticket.create({
				seat,
				available,
				schedule_id,
			});
			return await db.Ticket.findAll().then((result) => {
				res.send(result);
			});
		} catch (error) {
			return res.status(500).send({
				message: error.message,
			});
		}
	},
	editTicket: async (req, res) => {
		try {
			const { seat, available, schedule_id } = req.body;
			await db.Ticket.update(
				{
					seat,
					available,
					schedule_id,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			);

			return await db.Ticket.findOne({
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
	deleteTicket: async (req, res) => {
		try {
			await db.Ticket.destroy({
				where: {
					// id: req.params.id,
					id: {
						[Op.eq]: req.params.id,
					},
				},
			});
			return await db.Ticket.findAll().then((result) => res.send(result));
		} catch (error) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},
};

module.exports = ticketController;
