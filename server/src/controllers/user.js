const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = process.env.private_key;
const sequelize = require("sequelize");

const userController = {
	getAll: async (req, res) => {
		try {
			const user = await db.Users.findAll();
			return res.send(user);
		} catch (error) {
			res.status(500).send({
				message: error.message,
			});
		}
	},
	getById: async (req, res) => {
		const user = await db.Users.findOne({
			where: {
				id: req.params.id,
			},
		});
		return res.send(user);
	},
	register: async (req, res) => {
		try {
			const user = await db.Users.findOne({
				where: { email: req.query.email },
			});
			console.log(user);
		} catch (error) {
			res.status(500).send({
				message: error.message,
			});
		}
	},
	login: async (req, res) => {
		try {
			const user = await db.Users.findOne({
				where: {
					email: req.query.email,
				},
			});
			if (user) {
				const match = await bcrypt.compare(
					req.query.password,
					user.dataValues.password
				);
				if (match) {
					console.log(match);
					const token = jwt.sign(user.dataValues, privateKey, {
						expiresIn: "1h",
					});

					return res.send({
						user,
						token,
					});
				} else {
					throw new Error("Wrong Password");
				}
			} else {
				throw new Error("User Don't Exist");
			}
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	insertUserV1: async (req, res, next) => {
		try {
			const { name, email, password, address } = req.body;
			const hashPassword = await bcrypt.hash(password, 10);
			console.log(hashPassword);
			const result = await db.sequelize.transaction(async () => {
				const newUser = await db.Users.create({
					name,
					email,
					password: hashPassword,
					address,
				});
				console.log(newUser.dataValues);
				console.log(result);
			});
			return res.send(hashPassword);
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	editUser: async (req, res) => {
		try {
			const { name, email, password, address } = req.body;
			await db.Users.update(
				{
					name,
					email,
					password,
					address,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			);

			return await db.Users.findOne({
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
	deleteUser: async (req, res) => {
		try {
			await db.Users.destroy({
				where: {
					// id: req.params.id,
					id: {
						[Op.eq]: req.params.id,
					},
				},
			});
			return await db.Users.findAll().then((result) => res.send(result));
		} catch (error) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},
};

module.exports = userController;
