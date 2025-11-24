import express from "express";
import JobController from "../controller/job.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.js";
import { sendConfirmationEmail } from "../middleware/emailService.js";

const router = express.Router();
const jobController = new JobController();

router.get("/", jobController.showJobs);
// place create routes before the parameterized `/:id` route so `create` isn't treated as an `id`
router.get("/create", isAuthenticated, jobController.showCreateJob);
router.post("/create", isAuthenticated, jobController.addJob);
router.get("/:id", jobController.showJobDetails);
router.get("/:id/edit", isAuthenticated, jobController.showUpdateJob);
router.post("/:id/edit", isAuthenticated, jobController.editJob);
router.post("/:id/delete", isAuthenticated, jobController.removeJob);
router.post("/:id/apply", upload.single("resume"), (req, res) => {
  sendConfirmationEmail(req.body.email);
  res.redirect("/jobs");
});

export default router;
