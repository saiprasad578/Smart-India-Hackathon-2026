/* ADD PRODUCT TO CART */

function addToCart(product) {
showToast(product + " added to cart!");
}

/* TOAST */

function showToast(message) {

const toast = document.getElementById("toast");

if (!toast) return;

toast.innerText = message;

toast.classList.add("show");

setTimeout(() => {
    toast.classList.remove("show");
}, 2500);


}

/* SEARCH PRODUCTS */

function searchProducts() {

const input = document.getElementById("searchInput");

if (!input) return;

const search = input.value.toLowerCase();

const products = document.querySelectorAll(".product-card");

products.forEach(product => {

    const text = product.innerText.toLowerCase();

    if (text.includes(search)) {
        product.style.display = "";
    } else {
        product.style.display = "none";
    }

});


}