const dbCart = require("../../database/cookie/user_cart");
const cart=()=>{
    return dbCart;
}
const save2 = (cart_list, goods)=>{
    if(!cart_list[goods]){  //등록된 값이 없으면
        //cart_list={1:0}
        cart_list[goods]=0; //값을 입력
    }
    //cart_list={1:1}
    cart_list[goods]=cart_list[goods]+1;

    return cart_list;
    /*
    for(var i=0; i<dbCart.length;i++){
        if(dbCart[i].goods_id==goods){
            cart_list = dbCart[i];
            break;
        }
    }
    return cart_list;
    */
}
const view_list=(cart_list)=>{
    console.log("=== ser view_list ===");
    console.log(cart_list);
    let list =[];
    for(i in cart_list){
        console.log("key : ", i);
        let item = {};
        item['goods_id']=i;
        item['title']=dbCart[i-1].title;
        item['price']=dbCart[i-1].price;
        item['number']=cart_list[i];
        item['total']=dbCart[i-1].price * cart_list[i];
        console.log(item);
        list = list.concat(item);   //.concat : 배열이나 값을 기존의 배열과 합쳐서 새 배열로 반환
    }
    return list;
}
module.exports = {cart, save2, view_list};