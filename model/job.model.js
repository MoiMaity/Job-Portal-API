export const jobs = [];

export const createJob = (job) => {
  job.id = jobs.length + 1;
  jobs.push(job);
};

export const getAllJobs = () => jobs;

export const getJobById = (id) => jobs.find((job) => job.id === id);

export const updateJob = (id, updatedJob) => {
  const index = jobs.findIndex((job) => job.id === id);
  if (index !== -1) {
    jobs[index] = { ...jobs[index], ...updatedJob };
  }
};

export const deleteJob = (id) => {
  const index = jobs.findIndex((job) => job.id === id);
  if (index !== -1) jobs.splice(index, 1);
};
