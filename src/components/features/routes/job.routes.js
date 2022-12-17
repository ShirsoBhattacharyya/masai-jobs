const express = require("express");
const router = express.Router();
const JobModel = require("../models/job.model");
//get jobs filtered by role and sorted by date
router.get("/", async (req, res) => {
  const { filter_by_role, sort_by_date } = req.query;
  console.log(filter_by_role, sort_by_date);
  try {
    if (filter_by_role && sort_by_date) {
      const jobs = await JobModel.find({ role: filter_by_role });
      if (sort_by_date === "asc") {
        jobs.sort((a, b) => new Date(a.postedAt) - new Date(b.postedAt));
      } else if (sort_by_date === "desc") {
        jobs.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
      } else {
        res.status(401).send({
          message: "error",
          response: "Cannot perform this operation",
        });
      }
      res.send({ message: "success", response: jobs });
    } else if (filter_by_role) {
      const jobs = await JobModel.find({
        role: filter_by_role,
      });
      res.send({ message: "success", response: jobs });
    } else if (sort_by_date) {
      const jobs = await JobModel.find();
      if (sort_by_date === "asc") {
        jobs.sort((a, b) => new Date(a.postedAt) - new Date(b.postedAt));
      } else if (sort_by_date === "desc") {
        jobs.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
      } else {
        res.status(401).send({
          message: "error",
          response: "Cannot perform this operation",
        });
      }
      res.send({ message: "success", response: jobs });
    } else {
      let { page, limit } = req.query;
      if (!page) {
        page = 1;
      }
      if (!limit) {
        size = 10;
      }
      limit = +limit;
      const jobs = await JobModel.find()
        .skip((page - 1) * limit)
        .limit(limit);
      res.send({ message: "success", response: jobs });
    }
  } catch (e) {
    res.status(500).send({ message: "error", response: e.message });
  }
});
// Adding a new job
router.post("/newjob", async (req, res) => {
  let {
    company,
    postedAt,
    city,
    location,
    role,
    level,
    contract,
    position,
    language,
  } = req.body;
  try {
    let newJob = await JobModel.create({
      company,
      postedAt,
      city,
      location,
      role,
      level,
      contract,
      position,
      language,
    });
    res.json({ message: "success", response: newJob });
  } catch (e) {
    res.status(500).json({ message: "error", response: e.message });
  }
});
//Search by techStack
router.get("/search", async (req, res) => {
  let { query } = req.query;
  console.log(query);
  try {
    let jobs = await JobModel.find({ language: query });
    res.send({ message: "success", response: jobs });
  } catch (e) {
    res.status(500).send({ message: "error", response: e.message });
  }
});
module.exports = router;
