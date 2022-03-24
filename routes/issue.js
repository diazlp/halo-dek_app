const express = require("express");
const router = express.Router();

const Controller = require("../controllers");

// -- form login and register
router.get("/add", Controller.addQuestionForm);
router.post("/add", Controller.addQuestion);
router.get("/:id/detail", Controller.detailQuestion);
router.get("/:id/detail/edit", Controller.detailFormEdit);
router.post("/:id/detail/edit", Controller.detailEdit);
router.get("/:id/detail/delete", Controller.detailDelete);

module.exports = router;
