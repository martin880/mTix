const db = require("../models");
const sequelize = require("sequelize");

const cityController = {
	getAll: async (req, res) => {
		try {
			const city = await db.City.findAll();
			return res.send(city);
		} catch (err) {
			console.log(err);
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	getById: async (req, res) => {
		const city = await db.City.findOne({
			where: {
				id: req.params.id,
			},
		});
		return res.send(city);
	},
	insertCity: async (req, res) => {
		try {
			const { name } = req.body;
			await db.City.create({
				name,
			});
			return await db.City.findAll().then((result) => {
				res.send(result);
			});
		} catch (error) {
			return res.status(500).send({
				message: error.message,
			});
		}
	},
	editCity: async (req, res) => {
		try {
			const { name } = req.body;
			await db.City.update(
				{
					name,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			);

			return await db.City.findOne({
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
	deleteCity: async (req, res) => {
		try {
			await db.City.destroy({
				where: {
					// id: req.params.id,
					id: {
						[Op.eq]: req.params.id,
					},
				},
			});
			return await db.City.findAll().then((result) => res.send(result));
		} catch (error) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},
};

module.exports = cityController;
