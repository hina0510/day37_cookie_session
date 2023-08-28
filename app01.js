const express = require("express");
//cookie
const cookieParser = require("cookie-parser");//parser : 문장의 구조 분석·오류 점검 프로그램
const app = express();
const cookieRouter = require("./src/routers/cookie/cookie_router");

//session
const sessionRouter = require("./src/routers/session/session_router");
const session = require("express-session");
const sessionConfig = require("./config/cookie_session/config");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true})); //body로 세션값을 보여주도록 사용

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(cookieParser("아무 값이나 키로 설정"));

app.use(session(sessionConfig.sessionConfig)); //config에서 설정한 세션 설정대로 사용

app.use("/cookie", cookieRouter);
app.use("/session", sessionRouter);

app.listen(3000, ()=>{console.log("3000 server")});