function addDetailsToModal(addButton) {
    var item = rollsList[addButton.id];

    localStorage.setItem("selectedItem", JSON.stringify(item));
    $("#modal-image").attr("src", item.img);
    $("#modal-name").text(item.name);
    $("#modal-price").text("₪" + item.price);
    $("#modal-description").text(item.description);
}

function addToCart() {
    saveItemInLocalStorage();

    $('.toast').toast('show');
}

function saveItemInLocalStorage() {
    var item = JSON.parse(localStorage.getItem("selectedItem"));
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));

    if (cartItems == null) {
        var cartItemsArr = [];
        cartItemsArr[0] = item;
        localStorage.setItem("cartItems", JSON.stringify(cartItemsArr));
    } else {
        cartItems.push(item);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
}

function showCart() {

}