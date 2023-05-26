const db = require("../models");
const sequelize = require("sequelize");

const scheduleController = {
	getAll: async (req, res) => {
		try {
			const schedule = await db.Schedule.findAll();
			return res.send(schedule);
		} catch (err) {
			console.log(err);
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	getById: async (req, res) => {
		const schedule = await db.Schedule.findOne({
			where: {
				id: req.params.id,
			},
		});
		return res.send(schedule);
	},
	insertSchedule: async (req, res) => {
		try {
			const { movie_id, theater_id, schedule, studio, price } = req.body;
			await db.Schedule.create({
				movie_id,
				theater_id,
				schedule,
				studio,
				price,
			});
			return await db.Schedule.findAll().then((result) => {
				res.send(result);
			});
		} catch (error) {
			return res.status(500).send({
				message: error.message,
			});
		}
	},
	editSchedule: async (req, res) => {
		try {
			const { movie_id, theater_id, schedule, studio, price } = req.body;
			await db.Schedule.update(
				{
					movie_id,
					theater_id,
					schedule,
					studio,
					price,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			);

			return await db.Schedule.findOne({
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
	deleteSchedule: async (req, res) => {
		try {
			await db.Schedule.destroy({
				where: {
					// id: req.params.id,
					id: {
						[Op.eq]: req.params.id,
					},
				},
			});
			return await db.Schedule.findAll().then((result) => res.send(result));
		} catch (error) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},
};

module.exports = scheduleController;
