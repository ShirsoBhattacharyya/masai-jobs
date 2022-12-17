const express = require("express");
const dbConnect = require("./components/config/db");
const jobRouter=require('./components/features/routes/job.routes');
const cors = require("cors");
const server = express();
const PORT=process.env.PORT||8080;

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.get("/", (req, res) => {
  res.send("Welcome to Masai Jobs API");
});
server.use('/jobs',jobRouter);

server.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server started at port ${PORT}`);
});
