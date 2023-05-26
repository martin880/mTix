const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const PORT = process.env.PORT;
const db = require("./models/");
const routes = require("./routes");
app.use(express.json());
app.use(cors());

// db.sequelize.sync({ force: true }).then(() => console.log("Sync 'Complete"));
// db.sequelize.sync({ alter: true }).then(() => console.log("Sync 'Complete"));

app.use("/city", routes.cityRoutes);
app.use("/user", routes.userRoutes);
app.use("/movie", routes.movieRoutes);
app.use("/theater", routes.theaterRoutes);
app.use("/ticket", routes.ticketRoutes);
app.use("/schedule", routes.scheduleRoutes);
app.use("/order", routes.orderRoutes);
app.use("/orderitem", routes.orderitemRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
