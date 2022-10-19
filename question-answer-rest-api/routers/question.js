const express = require("express");
const answer = require("./answer");
const Question = require("../models/Question");
const {askNewQuestion , getAllQuestions ,getSingleQuestion,editQuestion , deleteQuestion , likeQuestion , undoLikeQuestion} = require("../controllers/question");
const{getAccessToRoute , getQuestionOwnerAccess} = require("../middlewares/authorization/auth");
const{checkQuestionExist} = require("../middlewares/database/databaseErrorHelpers");
const questionQueryMiddleware = require("../middlewares/query/questionQueryMiddleware");
const answerQueryMiddleware = require("../middlewares/query/answerQueryMiddleware");

//  api/questions
//  api/auth
const router = express.Router();

router.post("/ask",getAccessToRoute,askNewQuestion);
router.get("/",questionQueryMiddleware(
    Question,
    {
        population : {
            path: "user",
            select: "name profile_image"
        }
    }
),getAllQuestions);
router.get("/:id",checkQuestionExist,answerQueryMiddleware(Question,{
    population:[
        {
            path:"user",
            select: "name profile_image"
        },
        {
            path:"answers",
            select:"content"
        }
    ]
}),getSingleQuestion);
router.put("/:id/edit",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],editQuestion);
router.delete("/:id/delete",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],deleteQuestion);
router.get("/:id/like",[getAccessToRoute,checkQuestionExist],likeQuestion);
router.get("/:id/undo_like",[getAccessToRoute,checkQuestionExist],undoLikeQuestion);



router.use("/:question_id/answers",checkQuestionExist,answer);
 
//api/3232424/answers
module.exports = router;