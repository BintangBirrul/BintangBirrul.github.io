// script.js
const menuItems = [
    {
        name: "Americano",
        price: 10000,
        image: "https://www.nescafe.com/id/sites/default/files/Kopi-Hitam-Americano-dan-Espres" +
                "so%2C-Apa-Bedanya%2C-Ya.jpg"
    }, {
        name: "Latte",
        price: 12000,
        image: "https://www.ruparupa.com/blog/wp-content/uploads/2022/10/jenis-minuman-kopi-la" +
                "tte.jpg",
        description: "Halo"
    }, {
        name: "Mocha Latte",
        price: 19000,
        image: "https://flash-coffee.com/id/wp-content/uploads/sites/13/2023/06/MOCHA-LATTE.pn" +
                "g"
    }, {
        name: "Espresso",
        price: 11000,
        image: "https://awsimages.detik.net.id/community/media/visual/2021/12/19/3-trik-bikin-" +
                "kopi-espresso-tanpa-mesin-hasilnya-tetap-nikmat_169.jpeg?w=1200"
    }, {
        name: "Cappuccino",
        price: 18000,
        image: "https://media.istockphoto.com/id/1278995649/photo/iced-coffee-on-wooden-table-" +
                "on-summer-beach.jpg?s=612x612&w=0&k=20&c=j2rKy4UMmTh6rebMUHuhL392_ASZAn31bcsp4" +
                "7OKoQs="
    }, {
        name: "Frappuccino",
        price: 15000,
        image: "https://cdn.shopify.com/s/files/1/0003/0087/5786/files/Untitled_design_40_480x" +
                "480.png?v=1667746210"
    }, {
        name: "Mochaccino",
        price: 13000,
        image: "https://kanakala.id/wp-content/uploads/2023/06/Kanakala-Moccacino-Ice-Landscap" +
                "e-scaled.jpg"
    }, {
        name: "Caramel Latte",
        price: 10500,
        image: "https://api.omela.com/storage/1045/conversions/08dc2557057b05b5f3c74841d3bf7b7" +
                "5-large.jpg"
    }, {
        name: "Brown Sugar Latte",
        price: 14000,
        image: "https://cdn11.bigcommerce.com/s-5ljyj9oebs/images/stencil/600x600/products/281" +
                "9/18201/P071422183748_1__66386.1690917599.jpg?c=2"
    }
];

const orderList = document.querySelector(".order-list");
const checkoutButton = document.querySelector(".checkout-button");
const totalPayment = document.querySelector(".payment-info p");

let totalPrice = 0;

checkoutButton.addEventListener("click", () => {
    alert(`Total Pembayaran: Rp ${totalPrice}`);
});

menuItems.forEach((menuItem, index) => {
    const orderButton = document.createElement("button");
    orderButton.className = "order-button";
    orderButton.textContent = "Pesan";

    const menuDiv = document.createElement("div");
    menuDiv.className = "menu-item";

    //tampilan di item dan checkbox
    menuDiv.innerHTML = `
    <img src="${menuItem.image}" alt="${menuItem.name}" class="menu-image">
    <h2>${menuItem.name}</h2>
    <p>Harga: Rp ${menuItem.price}</p>
    <div class="extras">
        
    <div class = "sugar">
        <input type="checkbox" id="less-sugar-${index}" class="less-sugar-checkbox" value="Less Sugar">
        <label for="less-sugar-${index}">Less sugar</label>

        <input type="checkbox" id="normal-sugar-${index}" class="normal-sugar-checkbox" value="Normal Sugar">
        <label for="normal-sugar-${index}">Normal Sugar</label>

        <input type="checkbox" id="extra-sugar-${index}" class="extra-sugar-checkbox" value="Extra Sugar">
        <label for="extra-sugar-${index}">Extra Sugar</label>
    </div>

    <div class = "iced">
        <input type="checkbox" id="no-iced-${index}" class="no-iced-checkbox" value="No Iced">
        <label for="no-iced-${index}">No Iced</label>

        <input type="checkbox" id="less-iced-${index}" class="less-iced-checkbox" value="Less Iced">
        <label for="less-iced-${index}">Less Iced</label>

        <input type="checkbox" id="normal-iced-${index}" class="normal-iced-checkbox" value="Normal Iced">
        <label for="normal-iced-${index}">Normal Iced</label>
    </div>
    </div>
`;

    const sugarCheckboxes = Array.from(
        menuDiv.querySelectorAll(".sugar input[type='checkbox']")
    );
    const icedCheckboxes = Array.from(
        menuDiv.querySelectorAll(".iced input[type='checkbox']")
    );

    orderButton.addEventListener("click", () => {
        // Memeriksa checkbox "Sugar"
        const selectedSugarCheckboxes = sugarCheckboxes.filter(
            (checkbox) => checkbox.checked
        );
    
        // Memeriksa checkbox "Iced"
        const selectedIcedCheckboxes = icedCheckboxes.filter(
            (checkbox) => checkbox.checked
        );
    
        // Memeriksa jika lebih dari satu checkbox "Sugar" atau "Iced" yang dicentang
        if (selectedSugarCheckboxes.length > 1 || selectedIcedCheckboxes.length > 1) {
            if (selectedSugarCheckboxes.length > 1) {
                alert("Harap pilih salah satu Sugar");
            }
    
            if (selectedIcedCheckboxes.length > 1) {
                alert("Harap pilih salah satu Iced.");
            }
    
            // Reset semua checkbox "Sugar" dan "Iced" jika lebih dari satu yang dicentang
            sugarCheckboxes.forEach((checkbox) => {
                checkbox.checked = false;
            });
            icedCheckboxes.forEach((checkbox) => {
                checkbox.checked = false;
            });
        }
    
        // Mendapatkan tipe gula yang dipilih (less sugar, normal sugar)
        const sugarType = selectedSugarCheckboxes[0].value;
    
        // Mendapatkan tipe es yang dipilih (less iced, normal iced)
        const icedType = selectedIcedCheckboxes[0].value;
    
        // Check if the order already exists
        const existingOrderItem = Array.from(orderList.children).find((item) => {
            return item.querySelector(".item-name").textContent === menuItem.name &&
                   item.querySelector(".type").textContent === `Tambahan : ${sugarType} & ${icedType}`;
        });
    
        if (existingOrderItem) {
            alert("Anda telah memesan ini sebelumnya.");
        } else {
            // Membuat elemen pesanan dengan tipe gula dan es yang dipilih
            const orderItem = document.createElement("li");
            orderItem.innerHTML = `
                <span class="item-name">${menuItem.name}</span>
                <span class="item-quantity">1</span>
                <span class="item-price">Rp ${menuItem.price}</span>
                <span class="type">Tambahan : ${sugarType} & ${icedType}</span>
                <button class="remove-button">-</button>
                <button class="add-button">+</button>
            `;
    
            orderList.appendChild(orderItem);
            totalPrice += menuItem.price;
            totalPayment.textContent = `Total Pembayaran: Rp ${totalPrice}`;
        }
    });
    

    menuDiv.appendChild(orderButton);
    document
        .querySelector(".menu-container")
        .appendChild(menuDiv);

    orderButton.addEventListener("click", () => {
        const existingOrderItem = Array
            .from(orderList.children)
            .find((item) => {
                return item
                    .querySelector(".item-name")
                    .textContent === menuItem.name;
            });

        if (existingOrderItem) {
            const quantity = parseInt(
                existingOrderItem.querySelector(".item-quantity").textContent
            );
            existingOrderItem
                .querySelector(".item-quantity")
                .textContent = ` ${quantity + 1}`;
        } else {
            const orderItem = document.createElement("li");
            orderItem.innerHTML = `
                <span class="item-name">${menuItem.name}</span>
                <span class="item-quantity"> 1</span>
                <span class="item-price">Rp ${menuItem.price}</span>
                <button class="remove-button">-</button>
                <button class="add-button">+</button>
            `;

            orderList.appendChild(orderItem);
        }

        totalPrice += menuItem.price;
        totalPayment.textContent = `Total Pembayaran: Rp ${totalPrice}`;

    });
});

orderList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-button")) {
        const orderItem = e.target.parentElement;
        const price = parseInt(
            orderItem.querySelector(".item-price").textContent.match(/\d+/)[0]
        );
        const quantity = parseInt(
            orderItem.querySelector(".item-quantity").textContent
        );

        if (quantity === 1) {
            orderList.removeChild(orderItem);
        } else {
            orderItem
                .querySelector(".item-quantity")
                .textContent = ` ${quantity - 1}`;
        }

        totalPrice -= price;
        totalPayment.textContent = `Total Pembayaran: Rp ${totalPrice}`;
    }

    if (e.target.classList.contains("add-button")) {
        const orderItem = e.target.parentElement;
        const price = parseInt(
            orderItem.querySelector(".item-price").textContent.match(/\d+/)[0]
        );
        const quantity = parseInt(
            orderItem.querySelector(".item-quantity").textContent
        );

        orderItem
            .querySelector(".item-quantity")
            .textContent = ` ${quantity + 1}`;

        totalPrice += price;
        totalPayment.textContent = `Total Pembayaran: Rp ${totalPrice}`;
    }
});

function resetTransaction() {
    // Hide the "Checkout" button again
    const checkoutButton = document.querySelector(".checkout-button");
    checkoutButton.style.display = "block";

    // Remove any transaction messages after 5 seconds
    setTimeout(function () {
        const paymentInfo = document.querySelector(".payment-info");
        const messages = paymentInfo.querySelectorAll("p");
        messages.forEach((message) => {
            paymentInfo.removeChild(message);
        });

        const orderList = document.querySelector(".order-list");
        orderList.innerHTML = "";

        // Reset the total price to 0
        totalPrice = 0;
        totalPayment.textContent = `Total Pembayaran: Rp ${totalPrice}`;
    }, 5000);
}


function checkout() {
    // Tampilkan pesan "Transaksi Loading"
    const paymentInfo = document.querySelector(".payment-info");
    const loadingMessage = document.createElement("p");
    loadingMessage.textContent = "Transaksi Loading...";
    loadingMessage.classList.add("loading-message"); // Tambahkan kelas CSS
    paymentInfo.appendChild(loadingMessage);

    // Dapatkan daftar pesanan
    const orderList = document.querySelector(".order-list");
    const orderItems = orderList.querySelectorAll("li");

    // Setelah 10 detik (asumsi berhasil dalam 10 detik), ganti pesan
    setTimeout(function () {
        resetTransaction(); // Panggil fungsi resetTransaction untuk mengatur ulang tampilan

        if (orderItems.length === 0) {
            loadingMessage.textContent = "Failed: Tidak ada pesanan.";
            loadingMessage.classList.remove("loading-message"); // Hapus kelas "loading-message"
            loadingMessage.classList.add("failed-message"); // Tambahkan kelas "failed-message"
        } 
        if (orderItems.length === 1) {
            loadingMessage.textContent = "Success";
            loadingMessage.classList.remove("loading-message"); // Hapus kelas "loading-message"
            loadingMessage.classList.add("success-message"); // Tambahkan kelas "success-message"
        }
    }, 10 * 1000); // 10 detik
}

$('input').on('change', function() {
    $('body').toggleClass('blue');
  });
