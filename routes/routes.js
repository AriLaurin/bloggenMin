const { Router } = require("express");//we need the express router to plug into applications
const Controller = require("../controllers/controller"); //exports our controller to get our functions
const router  = Router(); ///creates a new router

router.get("/", Controller.home_get);
router.get("/create", Controller.create_get);
router.post("/create", Controller.create_post);


module.exports = router;