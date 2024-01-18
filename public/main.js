let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let cat = document.getElementById("cat");
let btn = document.getElementById("btn");

let mood = "create";
let gbl;


// get taxes keyup & mouseup
function getTaxes() {
    if (price.value != "") {
        let result = price.value * .19;
        taxes.value = result.toFixed(2);
    }
}
price.addEventListener("keyup", () => getTaxes());
price.addEventListener("mouseup", () => getTaxes());


// get total
function getTotal() {
    if (price.value != "" && taxes.value != "" && ads.value != "" && discount.value != "") {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result.toFixed(2);
        total.style.backgroundColor = "#040";
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "#ff0000cc";
    }
}

// create product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}

btn.onclick = function () {
    let newProd = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        cat: cat.value,
    }

    // count
    if (title.value != "" && price.value != "" && ads.value != "" && discount.value != "" && count.value <= +"100" && cat.value != "") {
        if (mood === "create") {
            // count
            if (newProd.count > 1) {
                for (let i = 0; i < newProd.count; i++) {
                    dataPro.push(newProd);
                }
            } else {
                dataPro.push(newProd);
            }

        } else {
            dataPro[gbl] = newProd;
            mood = "create";
            btn.innerHTML = "Create";
            count.style.display = "block";
        }
        clearData();
    }
    // save localstorage
    localStorage.setItem("product", JSON.stringify(dataPro));

    showData();
}


// clear inputs
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    cat.value = "";
    total.style.backgroundColor = "#ff0000cc";
}


// read
function showData() {
    let table = ``;

    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].cat}</td>
                <td><button id="update" onclick="updateData(${i})">Update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
            </tr> `
    }

    document.getElementById("tbody").innerHTML = table;

    // button delete all 
    let divDeleteAll = document.getElementById("delAll");
    if (dataPro.length > 0) {
        divDeleteAll.innerHTML = `
        <button onclick="deleteAll()">Delete all Products (${dataPro.length})</button>
        `
    } else {
        divDeleteAll.innerHTML = "";
    }
}

showData();



// delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

// delete all
function deleteAll() {
    dataPro.splice(0);
    localStorage.clear();
    showData();
}




// update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    getTaxes();
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = "none";
    cat.value = dataPro[i].cat;
    btn.innerHTML = "Update";

    mood = "update";
    gbl = i;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}



// search buttons
let searchMood = "title";

function getSearchMood(id) {
    let search = document.getElementById("search");
    // if (id == "byTitle") {
    //     searchMood = "title";
    // } else {
    //     searchMood = "category";
    // }
    id == "byTitle" ? searchMood = "title" : searchMood = "category";

    search.placeholder = "Search by " + searchMood.charAt(0).toUpperCase() + searchMood.slice(1);
    search.focus();
    search.value = "";
    showData();
}


// search input
function searchData(value) {
    let table = "";

    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == "title") {
            if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].cat}</td>
                        <td><button id="update" onclick="updateData(${i})">Update</button></td>
                        <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                    </tr> `
            }
        } else if (searchMood == "category") {
            if (dataPro[i].cat.toLowerCase().includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].cat}</td>
                        <td><button id="update" onclick="updateData(${i})">Update</button></td>
                        <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                    </tr> `
            }
        }
    }

    document.getElementById("tbody").innerHTML = table;
}