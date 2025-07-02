import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../model/job.model.js";

export default class JobController {
  showJobs(req, res) {
    res.render("jobs/list", { jobs: getAllJobs() });
  }

  showJobDetails(req, res) {
    const job = getJobById(parseInt(req.params.id));
    res.render("jobs/details", { job });
  }

  showCreateJob(req, res) {
    res.render("recruiter/create-job");
  }

  addJob(req, res) {
    createJob(req.body);
    res.redirect("/jobs");
  }

  showUpdateJob(req, res) {
    const job = getJobById(parseInt(req.params.id));
    res.render("recruiter/edit-job", { job });
  }

  editJob(req, res) {
    updateJob(parseInt(req.params.id), req.body);
    res.redirect("/jobs");
  }

  removeJob(req, res) {
    deleteJob(parseInt(req.params.id));
    res.redirect("/jobs");
  }
}
