const express = require("express");
const router = express.Router();

const Controller = require("../controllers");

// -- form login and register
router.get("/add", Controller.addQuestionForm);
router.post("/add", Controller.addQuestion);
router.get("/:id/detail", Controller.detailQuestion);

module.exports = router;
