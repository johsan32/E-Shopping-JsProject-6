import { htmlCategory, htmlProduct, htmlBasketItem, htmlBuyNow} from './ui.js';

//html yüklenirken çalışacak fonksiyon
document.addEventListener("DOMContentLoaded", () =>{
    fetchCategory();
    fetchProduct();
});


//API URL SABİT KISIM DEĞİŞKENE ATAMA YOLUYLA YAPILDI
const baseUrl ="https://dummyjson.com";
//CATEGORY KISIMINI JS KISMINA AKTARMA
function fetchCategory() {
    //APIye istek atma
    fetch(`${baseUrl}/products/categories`)
        .then((response) => (response.json()))
        //alınan veri json formatına dönünce bir fonksiyona atadık
        .then(data => {
            //console.log(data);
            htmlCategory(data);
        })
        //hata olursa error kısmı
        .catch((err) => console.log("category alanı hata döndü", err));
}
//dizi oluşturma id ye göre
let newData = [];

//product js ye aktrma 2. yöntemle yapıldı
async function fetchProduct(){
    try {  
    const rest= await fetch(`${baseUrl}/products`)
    //console.log("get işlemi", rest)
    const data = await rest.json();
    //datamızı eşleştirme
    newData = data.products;
    //console.log("data işlemi", data.products)
    htmlProduct(data);

    } catch (err){
        console.log("product alanı hata döndü", err)
    }
 
}


//sepete eklenenleri için dizi tanımlama
let basket = [];
let total = 0;
let amount=1;

//basket-btn tanımlama
const modal = document.querySelector(".modal")
const basketBtn = document.querySelector("#basket-btn")
const closeBasket = document.querySelector("#close-basket")
const basketList = document.querySelector(".item-card")
const buyNowHtml= document.querySelector(".modal-pay-content")


//login button tanımlama
const modalLogin = document.querySelector(".modal-login")
const loginBtn = document.querySelector("#login-btn")
const closeLogin = document.querySelector("#close-login")

//register button tanımlama
const modalRegister = document.querySelector(".modal-register")
const registerBtn = document.querySelector("#register-btn")
const closeRegister = document.querySelector("#close-register")

//payment
const modalPayment = document.querySelector(".modal-payment")
const paymentBtn = document.querySelector("#payment-btn")
const closePayment = document.querySelector("#close-payment")
const spanPayment = document.querySelector(".payment-span")

//pay now
const modalCheck = document.querySelector(".modal-chechout")
const payNowBtn = document.querySelector("#pay-btn")

//total
const totalSpan = document.querySelector(".total-s")
const totalP = document.querySelector(".total-p")

//modal buy now
const modalBuyNow = document.querySelector(".modal-buynow")
const nowBtn = document.querySelector("#paynow-btn")
const closePayBtn = document.querySelector("#close-buynow")

//amount
const amountNew = document.querySelector("#basket-amount")


//?basket button click
//basket button click ile açılma
basketBtn.addEventListener("click", () =>{
    modal.classList.add("active");
    //sepete aktarma fonksiyonu
    addList();
})
//basket button click ile close işlemi
closeBasket.addEventListener("click", () =>{
    modal.classList.remove("active");
    basketList.innerHTML = '';
    total = 0;
    totalSpan.textContent = "0";
});
//body bir alana tıklanınca kapanma işlemi
document.addEventListener("click", (event) =>{
    var clicked = event.target;
    //console.log(clicked)
    if(clicked.classList.contains("modal")){
        modal.classList.remove("active")
        basketList.innerHTML = '';
        total = 0;
        totalSpan.textContent = "0";
    }
});

//login btn click açılma
loginBtn.addEventListener("click", () =>{
    modalLogin.classList.add("active")
})

closeLogin.addEventListener("click", (e) =>{
    console.log(e)
    modalLogin.classList.remove("active");
});

//register
registerBtn.addEventListener("click", () =>{
    modalRegister.classList.add("active")
});
closeRegister.addEventListener("click", () =>{
    modalRegister.classList.remove("active");
})

//payment btn
paymentBtn.addEventListener("click", () =>{
    modal.classList.remove("active")
    modalPayment.classList.add("active")

})
closePayment.addEventListener("click", () =>{
    modalPayment.classList.remove("active");

})

//pay now finish
payNowBtn.addEventListener("click", () =>{
    modalPayment.classList.remove("active");
    modalCheck.classList.add("active")

    setTimeout(() => {
        modalCheck.classList.remove("active")
    }, 1000);  


})


    


//pay now anasayfa
nowBtn.addEventListener("click", () =>{
    modalBuyNow.classList.add("active")
    console.dir(modalBuyNow)
})
closePayBtn.addEventListener("click", () =>{
    modalBuyNow.classList.remove("active");
    modalBuyNow.style.display="none";
    console.dir(modalBuyNow)
})


//!sepete ekleme
document.body.addEventListener("click", findItem);

function findItem(e){
    const clickBtnId = e.target
    if(clickBtnId.id === "add-btn"){
        //console.dir(clickBtnId.dataset.id)
        //onsole.log(newData)

    const addSelect = newData.find((product) => product.id == clickBtnId.dataset.id);
        //console.log(addSelect)
 
    //sepet te miktar yoksa onu oluşturup 1 e eşitldik
    if(!addSelect.amount){
            addSelect.amount = 0;
        }
        addToBasket(addSelect);
    }
    if(clickBtnId.id === "btn-delete"){
        clickBtnId.parentElement.remove();

        const addSelected = newData.find((i) => i.id == clickBtnId.dataset.id);
        //console.log(addSelected)
        deleteItem(addSelected)
    }



    if(clickBtnId.id === "buy-btn"){
        //console.dir(clickBtnId.dataset.id)
        //console.log(newData)
        const addSelecting = newData.find((product) => product.id == clickBtnId.dataset.id);
        console.log(addSelecting)
        buyNow()
        htmlBuyNow(addSelecting)
        
    }
    
    if(clickBtnId.id === "paynow-btn"){
        //console.dir(clickBtnId.dataset.id)
        //console.log(newData)
        const addSelecting = newData.find((product) => product.id == clickBtnId.dataset.id);
        //console.log(addSelecting)
        modalBuyNow.style.display="none";
        modalCheck.classList.add("active")
        const buyNowHtml = document.querySelector(".card-buy");
        const parentElement = buyNowHtml.parentElement;
        parentElement.removeChild(buyNowHtml);
        setTimeout(() => {
        modalCheck.classList.remove("active")
        }, 1000); 
    }

        
    if(clickBtnId.id === "add-btn"){
        //console.dir(clickBtnId.dataset.id)
        //console.log(newData)

    const addSelect = newData.find((product) => product.id == clickBtnId.dataset.id);
        //console.log(addSelect)
 
    //sepet te miktar yoksa onu oluşturup 1 e eşitldik
    if(!addSelect.amount){
            addSelect.amount = 0;
        }
        addToBasket(addSelect);
    }

    
    if(clickBtnId.id === "btn-up"){
        
        const selected = newData.find((i) => i.id == clickBtnId.dataset.id);
        console.log(selected)
        selected.amount++;
       
        updateAmount() 
    }

    if(clickBtnId.id === "btn-down"){
        
        const selected = newData.find((i) => i.id == clickBtnId.dataset.id);
        if (selected.amount > 1){
          selected.amount--; 
            
        updateAmount() 
        }
        
    }

}    





function addToBasket(basketItem) {
    //console.log(basketItem);
    const foundItem = basket.find((item) => item.id === basketItem.id);
    //console.log(findItem);
    if (foundItem) {
        foundItem.amount++;
    } else {
        basket.push(basketItem);
    }
    //console.log(basket);   
}

function addList(){
    basket.forEach((basketItem) =>{
    htmlBasketItem(basketItem);
    total += basketItem.price * basketItem.amount;

    //console.log(basket)

});
    //console.log(total);
    totalSpan.textContent = total + "$";
    spanPayment.textContent = total + "$";
    
    

}


function deleteItem(delIitem){
    const filterData = basket.filter((item) =>item.id !== delIitem.id);
    basket = filterData;
    total -= delIitem.price * delIitem.amount;
    totalSpan.textContent = total  + "$";
}

function buyNow() {
    const buyClick = document.querySelector(".modal-buynow");
    buyClick.style.display = "grid";   
}



function updateAmount() {
    basket.forEach((basketItem) =>{
    let findItem = basket.find((item) => item.id === basketItem.id); 
    if(findItem) {
    findItem.amount = basketItem.amount;
    console.log(findItem.amount)
    //amount = basketItem.amount;

    total = basketItem.price * basketItem.amount;
    totalSpan.textContent = total + "$";
   
    console.log(amount);
    console.log(basketItem.amount);
    const amountNew = document.querySelector("#basket-amount")
    amountNew.textContent = basketItem.amount;

    }
});
}