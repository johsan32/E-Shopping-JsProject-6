//category html alana alma category alana eriştik
const categoryHtml =document.querySelector(".category-card")
//product html alana alma product alana eriştik
const productHtml =document.querySelector(".products")
//modal sepet alanı dinamik dive dönüştürme
const basketHtml = document.querySelector(".item-card")
//buy now html alanı
const h4Element = document.querySelector('.h4');


//category alanı dinamik dive dönüştürme
export function htmlCategory(category) {
    category.slice(0,5).forEach((item) => {
        //console.log("cate" ,item);
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("card");
        categoryDiv.innerHTML = `
            <img src="https://picsum.photos/640/640?r=4892" alt="">
            <span>${item}</span>
        `
        categoryHtml.appendChild(categoryDiv);
    });
}
//product alanı dinamik dive dönüştürme
export function htmlProduct(data) {
    const products = data.products;
    //console.log("product", product)
    products.forEach(product => {
        //console.log("product item",products)
        const productDiv = document.createElement('div')
        productDiv.className = 'product-card'
        productDiv.innerHTML = `
            <div class="product-card">
                <img src="${product.images[0]}" alt="" width="120px" height="200px">
                <p>${product.title}</p>
                <p>${product.category}</p>
                <div class="product-price">
                    <button id="add-btn" data-id=${product.id}>Add to Cart</button>
                    <button id="buy-btn" data-id=${product.id}>Buy Now</button>
                </div>
                <span>$ ${product.price}</span>
            </div>
        `
        productHtml.appendChild(productDiv)
    }); 
}

export function htmlBasketItem(basketItem){
    console.log(basketItem)
    const basketDiv = document.createElement('div')
    basketDiv.className = 'card'
    basketDiv.innerHTML = `
        <img src="${basketItem.images[0]}" alt="">
        <div class="card-info">
            <div class="card-add">
                <p>${basketItem.title}</p>
                <p>"${basketItem.category}"</p>
            </div>
            <div class="card-price">
                <span>$ ${basketItem.price}</span>
            </div>
            <div class="card-btn">
                <button id="btn-down" data-id=${basketItem.id}><img src="images/download.png" alt=""></button>
                <span id="basket-amount" data-id=${basketItem.id}>${basketItem.amount}</span>
                <button id="btn-up" data-id=${basketItem.id}><img src="images/upload.png" alt=""></button>
            </div>
        </div>
        <button id="btn-delete" data-id=${basketItem.id}><i class="fa-solid fa-trash-can" style="color: #e00b0b;"></i></button>
    `
    basketHtml.appendChild(basketDiv)
}


export function htmlBuyNow(products){
    const buyNowDiv = document.createElement('div')

    const discountPrice = products.price * 0.90;
    const formattedPrice = `${discountPrice.toFixed(2)}`;

    buyNowDiv.className = 'card-buy'
    buyNowDiv.innerHTML = `
        <img src="${products.images[0]}" alt="">
        <div class="card-info">
            <div class="card-add">
                <p>${products.title}</p>
                <strike>${products.price} $</strike>
                <p>${formattedPrice} $</p>
            </div>
        </div>
    `
    h4Element.insertAdjacentElement('afterend', buyNowDiv);

}