const createJob = (req, res) => {
    res.send("Create Job")
}

const deleteJob = (req, res) => {
    res.send("Delete Job")
}

const getAllJobs = (req, res) => {
    res.send("Get All Jobs")
}

const updateJob = (req, res) => {
    res.send("Update Job")
}

const showStats = (req, res) => {
    res.send("Show Stats Job")
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }