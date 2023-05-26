const db = require("../models");
const sequelize = require("sequelize");

const theaterController = {
	getAll: async (req, res) => {
		try {
			const theater = await db.Theaters.findAll();
			return res.send(theater);
		} catch (err) {
			console.log(err);
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	getById: async (req, res) => {
		const theater = await db.Theaters.findOne({
			where: {
				id: req.params.id,
			},
		});
		return res.send(theater);
	},
	insertTheaters: async (req, res) => {
		try {
			const { name, address, city_id } = req.body;
			await db.Theaters.create({
				name,
				address,
				city_id,
			});
			return await db.Theaters.findAll().then((result) => {
				res.send(result);
			});
		} catch (error) {
			return res.status(500).send({
				message: error.message,
			});
		}
	},
	editTheaters: async (req, res) => {
		try {
			const { name, address, city_id } = req.body;
			await db.Theaters.update(
				{
					name,
					address,
					city_id,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			);

			return await db.Theaters.findOne({
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
	deleteTheaters: async (req, res) => {
		try {
			await db.Theaters.destroy({
				where: {
					// id: req.params.id,
					id: {
						[Op.eq]: req.params.id,
					},
				},
			});
			return await db.Theaters.findAll().then((result) => res.send(result));
		} catch (error) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},
};

module.exports = theaterController;
