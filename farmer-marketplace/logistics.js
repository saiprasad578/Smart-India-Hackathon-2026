/* ROUTE OPTIMIZATION */

function optimizeRoute() {

showToast("🤖 AI is optimizing the delivery route...");

setTimeout(() => {

    showToast(
        "✓ Route optimized! 18% fuel can be saved."
    );

}, 2000);


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