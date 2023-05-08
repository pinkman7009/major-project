const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const { protect, authorize } = require("../middleware/auth");

router.get("/", protect, authorize(0, 1), async (req, res) => {
  try {
    const application = await Application.find({
      applicant: req.user.id,
    }).populate("service");

    res.status(200).json(application);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.get("/lawyer", protect, authorize(0, 1), async (req, res) => {
  try {
    const application = await Application.find({
      lawyer: req.user.id,
    })
      .populate("service")
      .populate("lawyer")
      .populate("applicant");

    res.status(200).json(application);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.get("/applicant", protect, authorize(0, 1), async (req, res) => {
  try {
    const application = await Application.find({
      applicant: req.user.id,
    })
      .populate("service")
      .populate("lawyer");

    res.status(200).json(application);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.get("/:id", protect, authorize(0, 1), async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      "applicant"
    );
    res.status(200).json(application);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.post("/", protect, authorize(0), async (req, res) => {
  try {
    const { service, problem, status, attachment, is_complete, lawyer } =
      req.body;

    let application = new Application({
      service,
      lawyer,
      problem,
      status,
      attachment,
      is_complete,
      applicant: req.user.id,
    });

    await application.save();

    res.status(201).json(application);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.put("/:id", protect, authorize(0, 1), async (req, res) => {
  try {
    let application = await Application.findById(req.params.id);

    application.problem = req.body.problem || application.problem;
    application.status = req.body.status || application.status;
    application.attachment = req.body.attachment || application.attachment;
    application.is_complete = req.body.is_complete || application.is_complete;

    await application.save();

    res.status(201).json(application);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.delete("/:id", protect, authorize(0), async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "The application has been deleted",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
