//const service = require("../../service/cookie/cookie_service");
const cookieConfig = {  //Config : 설정
    httpOnly : true,    //http만 허용(보안)
    maxAge : 60000,      //5초동안 쿠키값을 유지함
    signed : true       //쿠키에 대해 암호화 설정
}
const index = (req, res) =>{
    let userCookie = req.signedCookies.myCookie;    //암호화된 쿠키값(myCookie)을 전달
    //let userCookie = req.cookies.myCookie;  //사용자의 쿠키값(myCookie)을 전달
    console.log(req.cookies);               //확인
    res.cookie("myCookie", "valueCookie", cookieConfig);    //쿠키를 생성(key, value, 설정)
    res.render("cookie/cookie01", {userCookie});            //쿠키값을 가지고 cookie01 실행
}
const popup = (req, res) =>{
    res.render("cookie/popup"); //팝업 실행
}
// index에서 쿠키값을 생성

const quiz = (req, res) =>{
    const userCookie = req.cookies.myCookie;    //사용자의 쿠키값(myCookie)을 전달
    res.render("cookie/quiz",{userCookie});     //쿠키값을 가지고 quiz 실행
}
const quizPopup = (req, res) =>{
    res.render("cookie/quizPopup"); //팝업 실행
}// quizPopup에서 쿠키값을 생성하고 쿠키값이 있으면 팝업X(makeCookie가 내부에 있음)
const makeCookie = (req, res) =>{
    res.cookie("myCookie", "valueCookie", cookieConfig); //쿠키를 생성
    res.render("cookie/quizPopup"); //팝업 실행
}
const ser = require("../../service/cookie/cookie_service");
const cart = (req, res) =>{
    res.render("cookie/cart", {list : ser.cart()});
}
const save1 = (req, res) =>{
    console.log("=== save1 ===");
    console.log("param : ",req.param("id"));
    console.log("query : ",req.query);
    console.log("param : ",req.params);    //?일 때 안나옴
    res.send("save1 연결");     //메세지를 보냄
}

const save2 = (req, res) =>{
    console.log("=== save2 ===");
    let cart_list = req.signedCookies.cart_list;
    if(cart_list===undefined){
        cart_list = {};
    }

    cart_list = ser.save2(cart_list, req.params.goods);
    
    res.cookie("cart_list", cart_list, cookieConfig);

    console.log("cart_list : ", cart_list); //선택한 상품 정보

    console.log("param : ",req.param("goods"));
    console.log("query : ",req.query);  //경로일 때는 안나옴
    console.log("param : ",req.params);

    const msg=`<script>
     alert("${req.params.goods} 상품이 등록되었습니다");
     location.href = "/cookie/cart"; 
    </script>`;
    res.send(msg);
}

const viewList= (req, res) =>{
    let cart_list = req.signedCookies.cart_list;
    if(!cart_list){ //true  //if(cart_list===undefined){ 
        const msg=`<script>
     alert("저장된 목록이 없습니다");
     location.href = "/cookie/cart"; 
    </script>`;
    res.send(msg);
    }
    res.render("cookie/view_list", {list : ser.view_list(cart_list)});
}

module.exports = {index, popup, quiz, quizPopup, makeCookie, cart, save1, save2, viewList};