import express from "express";
import JobController from "../controller/job.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();
const jobController = new JobController();

router.get("/", jobController.showJobs);
router.get("/:id", jobController.showJobDetails);
router.get("/create", isAuthenticated, jobController.showCreateJob);
router.post("/create", isAuthenticated, jobController.addJob);
router.get("/:id/edit", isAuthenticated, jobController.showUpdateJob);
router.post("/:id/edit", isAuthenticated, jobController.editJob);
router.post("/:id/delete", isAuthenticated, jobController.removeJob);
router.post("/:id/apply", upload.single("resume"), (req, res) => {
  sendConfirmationEmail(req.body.email);
  res.redirect("/jobs");
});

export default router;
