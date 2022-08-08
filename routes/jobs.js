const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJob,
  CreateJobs,
  UpdateJobs,
  DeleteJobs,
} = require("../controllers/jobs");

router.route("/").post(CreateJobs).get(getAllJobs);
router.route("/:id").patch(UpdateJobs).delete(DeleteJobs).get(getJob);

module.exports = router;
