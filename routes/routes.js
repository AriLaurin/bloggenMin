const { Router } = require("express");//we need the express router to plug into applications
const Controller = require("../controllers/controller"); //exports our controller to get our functions
const router  = Router(); ///creates a new router

router.get("/", Controller.home_get);

router.post("/create", Controller.create_post);

router.get("/account", Controller.account_get);

router.get("/signup", Controller.signup_get);
router.post("/signup", Controller.signup_post);

router.get("/login", Controller.login_get);
router.post("/login", Controller.login_post);

router.get("/logout", Controller.logout_get);

router.get("/:id", Controller.blogdetail_get);

router.delete("/:id", Controller.blog_delete);

module.exports = router;