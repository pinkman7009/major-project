const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

const app = express();

connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

app.use("/api/login", require("./routes/login"));
app.use("/api/register", require("./routes/register"));
app.use("/api/services", require("./routes/services"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/users", require("./routes/user"));
app.use("/api/tag", require("./routes/tags"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
