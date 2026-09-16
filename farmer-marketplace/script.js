function showPage(pageName, button) {

    // Hide all pages
    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active-page");
    });


    // Show selected page
    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }


    // Update title
    const titles = {
        dashboard: "Dashboard",
        marketplace: "Marketplace",
        farmers: "Farmers & FPOs",
        orders: "Orders",
        ai: "AI Insights",
        logistics: "Logistics"
    };

    document.getElementById("pageTitle").innerText =
        titles[pageName];


    // Update sidebar active button
    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    window.scrollTo(0, 0);
}


/* ADD PRODUCT TO CART */

function addToCart(product) {

    showToast(product + " added to cart!");

}


/* TOAST */

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}


/* SEARCH */

function searchProducts() {

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const text =
            product.innerText.toLowerCase();

        if (text.includes(search)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });
}


/* ROUTE OPTIMIZATION */

function optimizeRoute() {

    showToast("🤖 AI is optimizing the delivery route...");

    setTimeout(() => {

        showToast(
            "✓ Route optimized! 18% fuel can be saved."
        );

    }, 2000);

}