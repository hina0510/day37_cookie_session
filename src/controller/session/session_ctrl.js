const index = (req, res)=>{
    res.render("session/index");
}
const setSession = (req, res)=>{
    req.session.name = "홍길동";
    req.session.age = 20;
    res.render("session/set_session"); //세션값을 입력
}
const getSession = (req, res)=>{
    const sessionValue = {
        name : req.session.name, // 동일 브라우저에서만 세션이 적용됨
        age : req.session.age
    };
    res.render("session/get_session", sessionValue); // setSession에서 입력한 세션값을 가져옴
}
const delSession = (req, res)=>{
    //delete req.session.name;  //특정 세션 하나만 삭제
    req.session.destroy();  //모든 세션 삭제
    res.render("session/del_session");
}
const login = (req, res)=>{
    res.render("session/login", {nick:req.session.nick});
}
const loginCheck = (req, res)=>{
    console.log("query", req.query);    //get일 때 세션값을 받아옴
    console.log("params", req.params);
    console.log("body", req.body);      //post일 때 세션값을 받아옴
    console.log("=== login check===");
    console.log(req.body.id);
    console.log(req.body.pw);

    const DBid = "aaa", DBpw = "111", nick = "홍길동";
    if(DBid===req.body.id && DBpw===req.body.pw){      //미리 지정한 정보와 입력 정보 일치 시
        req.session.id2 = DBid;     //세션값 id2에 정보를 넣음(true)
        req.session.nick = nick;    //세션값 nick에 정보를 넣음
        return res.redirect("/session/success");
    }
    const msg = `<script>
    alert("로그인 실패");location.href="/session/login";
    </script>`;
    res.send(msg);
    res.send("로그인 확인");
}
const success = (req, res)=>{
    console.log(req.session.id2);
    if(req.session.id2) //세션값 id2에 정보가 있을 때(true) - 로그인 중
        return res.render("session/success", {nick:req.session.nick});
    const msg=`<script>
    alert("로그인 해라");location.href="/session/login";
    </script>`;
    res.send(msg);
}
const logout = (req, res)=>{
    req.session.destroy(()=>{
        console.log("모든 세션을 만료합니다");  //세션을 삭제하면서 로그기능 실행
    });
    res.redirect("/session/login");
}
module.exports = {index, setSession, getSession, delSession, login, loginCheck, success, logout}