const express = require("express");
const {getAccessToRoute} = require("../middlewares/authorization/auth");
const {addNewAnswerToQuestion , getAllAnswersByQuestion , getSingleAnswer , editAnswer, deleteAnswer,likeAnswer,undoLikeAnswer} = require("../controllers/answer");
const {chechkQuestionAndAnswerExist, checkQuestionandAnswerExist} = require("../middlewares/database/databaseErrorHelpers");
const {getAnswerOwnerAccess} = require("../middlewares/authorization/auth");

const router = express.Router({mergeParams:true});

router.post("/",getAccessToRoute,addNewAnswerToQuestion);
router.get("/",getAllAnswersByQuestion);
router.get("/:answer_id",checkQuestionandAnswerExist,getSingleAnswer);
router.put("/:answer_id/edit",[checkQuestionandAnswerExist,getAccessToRoute,getAnswerOwnerAccess],editAnswer);
router.delete("/:answer_id/delete",[checkQuestionandAnswerExist,getAccessToRoute,getAnswerOwnerAccess],deleteAnswer);
router.get("/:answer_id/like",[checkQuestionandAnswerExist,getAccessToRoute],likeAnswer);
router.get("/:answer_id/undo_like",[checkQuestionandAnswerExist,getAccessToRoute],undoLikeAnswer);


module.exports = router;