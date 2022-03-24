const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

const Controller = require("../controllers");

// -- form login and register
router.get("/add", requireLogin, requireCredits, Controller.addQuestionForm);
router.post("/add", Controller.addQuestion);

router.get("/:id/detail", requireLogin, Controller.detailQuestion);

router.get("/:id/detail/edit", requireLogin, Controller.detailFormEdit);
router.post("/:id/detail/edit", Controller.detailEdit);

router.get("/:id/detail/delete", Controller.detailDelete);

module.exports = router;
