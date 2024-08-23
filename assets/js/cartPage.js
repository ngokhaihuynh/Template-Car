const cartContainer = document.querySelector(".cart-container .cart-box");
const payMoneyNow = document.querySelector(".pay-money-now");
const payMoney = document.querySelector(".pay-money");
const payButton = document.querySelector(".pay-button");
const paymentForm = document.getElementById("payment-form");
const paymentMethodSelect = document.getElementById("payment-method");
const qrCode = document.getElementById("qr-code");
const confirmPaymentButton = document.getElementById("confirm-payment");
const paymentOverlay = document.getElementById("payment-overlay");

let money = 0;
let cartDeleteBtn;

renderCart();

function renderCart() {
    if (cartItems.items.length > 0) {
        let cartInnerHTML = "";
        money = 0;
        cartItems.items.forEach((element, index) => {
            console.log(element);
            money += Number(element.price);
            cartInnerHTML += `
            <div class="cart-item">
                <img
                    src="${element.imgsCar[0]}"
                    alt="hinh anh"
                    class="cart-item__img"
                />
                <div class="cart-item__info">
                    <span class="cart-item__name">${element.tenXe}</span>
                    <p class="cart-item__desc">
                        Bảo hành :
                        <span class="cart-item__info-date">${element.warranty}</span>
                    </p>
                    <span data-cart=${index} class="cart-delete">Xóa</span>
                </div>
                <div class="cart__box-price">
                    <span class="cart__box-price-span"
                        >${Number(element.price).toLocaleString("en-US")} vnd</span
                    >
                </div>
            </div>
            `;
        });
        cartContainer.innerHTML = cartInnerHTML;
        cartDeleteBtn = document.querySelectorAll(".cart-delete");
        cartDeleteBtn.forEach((e) => {
            e.onclick = () => {
                let idx = Number(e.dataset.cart);
                cartItems.items.splice(idx, 1);
                let quantity = --cartItems.amount;
                cartItems = {
                    amount: quantity,
                    items: cartItems.items,
                };
                localStorage.setItem("cart-items", JSON.stringify(cartItems));
                updateStatusCart();
                e.closest(".cart-item").remove();
                renderCart();
            };
        });
    } else {
        cartContainer.innerHTML = `
            <div class="no-cart__img"></div>
            <div class="cart-box__bottom">
                <a href="./carsPage.html" class="cart-back">Tiếp tục chọn chọn xe</a>
            </div>`;
    }
    if (cartItems.items.length <= 0) {
        money = 0;
    }
    payMoneyNow.innerHTML = money.toLocaleString("en-US").toString() + "₫";
    payMoney.innerHTML = money.toLocaleString("en-US").toString() + "₫";
}

// Xử lý sự kiện click nút "Thanh Toán"
payButton.addEventListener("click", () => {
    // Kiểm tra xem giỏ hàng có hàng hay không
    if (cartItems.items.length === 0) {
        if (confirm("Giỏ hàng của bạn đang trống. Bạn có muốn tiếp tục mua sắm không?")) {
            // Nếu đồng ý, chuyển sang trang carsPage.html
            window.location.href = "./carsPage.html";
        }
        // Nếu không đồng ý, không làm gì cả
        return; // Ngăn chặn tiến trình tiếp tục nếu giỏ hàng trống và người dùng không muốn tiếp tục mua sắm
    }
    // Nếu giỏ hàng không trống, hiển thị form thanh toán
    paymentForm.classList.add("active");
    paymentOverlay.classList.add("active");
});



// Xử lý sự kiện thay đổi phương thức thanh toán
paymentMethodSelect.addEventListener("change", (e) => {
    if (e.target.value === "bank") {
        qrCode.style.display = "block";
    } else {
        qrCode.style.display = "none";
    }
});

// Xử lý sự kiện click nút "Xác nhận thanh toán"
// Xử lý sự kiện click nút "Xác nhận thanh toán"
confirmPaymentButton.addEventListener("click", () => {
    // Kiểm tra xem tất cả các trường đã được điền đầy đủ hay không
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const paymentMethod = document.getElementById("payment-method").value;

    if (name.trim() === "" || address.trim() === "" || phone.trim() === "" || paymentMethod.trim() === "") {
        alert("Vui lòng điền đầy đủ thông tin thanh toán.");
        return; // Ngăn chặn tiến trình tiếp tục nếu thông tin chưa đầy đủ
    }

    // Nếu thông tin đã được điền đầy đủ, tiến hành xác nhận thanh toán
    alert("Đặt hàng thành công!");
    cartItems = { amount: 0, items: [] };
    localStorage.setItem("cart-items", JSON.stringify(cartItems));
    renderCart();
    paymentForm.classList.remove("active");
    paymentOverlay.classList.remove("active");
});


// Xử lý sự kiện click vào overlay để ẩn form thanh toán
paymentOverlay.addEventListener("click", () => {
    paymentForm.classList.remove("active");
    paymentOverlay.classList.remove("active");
});

