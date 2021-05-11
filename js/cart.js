function buildCartTable(cartItems) {
    if (cartItems == null) {
        $("#items-table").html("<p class='text-center'>אין פריטים בהזמנה</p>")
    } else {
        $("#table-body").html("");
        addItemsToTable(cartItems);
    }
}

function buildTable() {
    $("#items-table").html(`
        <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">שם פריט</th>
                <th scope="col">מחיר</th>
                <th scope="col">הסרה</th>
            </tr>
        </thead>
     <tbody id="table-body">
            </tbody>
    `)
}

function addItemsToTable(cartItems) {
    cartItems.forEach((item, index) => {
        $("#table-body").append(`
            <tr>
                <td scope="row"><img class="rounded" src="${item.img}"></td>
                <td>${item.name}</td>
                <td>₪${item.price}</td>
                <td><i id="${index}" class="far fa-times-circle icon fa-lg" onclick="removeItem(this)"></i></td>
            </tr>
        `);
    });
}

function removeItem(button) {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    cartItems.splice(button.id, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    buildCartTable(cartItems);
    buildSummarizeCard(cartItems);
}

function buildSummarizeCard(cartItems) {
    $("#items-amount").text(`סה"כ פריטים (${cartItems.length})`);
    $("#total-price").text(`לתשלום ₪${calcTotalPrice(cartItems)}`);
}

function calcTotalPrice(cartItems) {
    let totalPrice = 0;

    cartItems.forEach((item) => {
        totalPrice += item.price;
    })

    localStorage.setItem("totalPrice", totalPrice);

    return totalPrice;
}

document.addEventListener('DOMContentLoaded', (event) => {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));

    buildCartTable(cartItems);
    buildSummarizeCard(cartItems);
})