const ProjectController = require("../controllers/Driver");
const { verifyToken } = require("./../middleware/Auth");

const ProjectRoutes = async (router) => {
  // Main Project Routes
  await router.route("/drivers").post(ProjectController.Register);
  await router
    .route("/drivers/verify_email/:token_id")
    .get(verifyToken, ProjectController.VerifyEmail);

  await router.route("/drivers/cabs").post(ProjectController.FindCabs);

  await router.route("/drivers/:id").patch(ProjectController.ShareLocation);
};

module.exports = ProjectRoutes;
