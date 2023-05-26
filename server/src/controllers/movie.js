const db = require("../models");
const sequelize = require("sequelize");

const movieController = {
	getAll: async (req, res) => {
		try {
			const movie = await db.Movie.findAll();
			return res.send(movie);
		} catch (err) {
			console.log(err);
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	getById: async (req, res) => {
		const movie = await db.Movie.findOne({
			where: {
				id: req.params.id,
			},
		});
		return res.send(movie);
	},
	insertMovie: async (req, res) => {
		try {
			const { filename } = req.file;
			const {
				name,
				synopsis,
				type,
				duration,
				producer,
				director,
				writer,
				cast,
				distributor,
				website,
			} = req.body;
			await db.Movie.create({
				name,
				synopsis,
				type,
				duration,
				producer,
				director,
				writer,
				cast,
				distributor,
				website,
				image_url: process.env.movie_url + filename,
			});
			return await db.Movie.findAll().then((result) => {
				res.send(result);
			});
		} catch (error) {
			return res.status(500).send({
				message: error.message,
			});
		}
	},
	editMovie: async (req, res) => {
		try {
			const {
				name,
				synopsis,
				type,
				duration,
				producer,
				director,
				writer,
				cast,
				distributor,
				website,
				image_url,
			} = req.body;
			await db.Movie.update(
				{
					name,
					synopsis,
					type,
					duration,
					producer,
					director,
					writer,
					cast,
					distributor,
					website,
					image_url,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			);

			return await db.Movie.findOne({
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
	deleteMovie: async (req, res) => {
		try {
			await db.Movie.destroy({
				where: {
					// id: req.params.id,
					id: {
						[Op.eq]: req.params.id,
					},
				},
			});
			return await db.Movie.findAll().then((result) => res.send(result));
		} catch (error) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},
};

module.exports = movieController;
