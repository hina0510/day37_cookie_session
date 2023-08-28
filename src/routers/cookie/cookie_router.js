const express = require("express");
const ctrl = require("../../controller/cookie/cookie_ctrl");
const router = express.Router();

router.get("/", ctrl.index);
router.get("/popup", ctrl.popup);
router.get("/quiz", ctrl.quiz);
router.get("/quiz_popup", ctrl.quizPopup);
router.get("/makeCookie", ctrl.makeCookie);

router.get("/cart", ctrl.cart);
router.get("/save1", ctrl.save1);
router.get("/save2/:goods", ctrl.save2);// /:goods 변수에 아이디 저장
router.get("/view_list", ctrl.viewList);

module.exports = router;
