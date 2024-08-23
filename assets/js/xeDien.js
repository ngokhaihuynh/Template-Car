let array = [];
const contentSlider = document.querySelector(".content-slider");
let numberslider = 7;

// Load main content
const dataUrl = "https://66599465de346625136d0a61.mockapi.io/api/v1/otodien/otodien";
fetch(dataUrl)
    .then((res) => res.json())
    .then((res) => {
        array = res;
    });

function showAlert() {
    let alertBox = document.querySelector(".alertBox");
    alertBox.style.transform = "translateX(0%)";
    alertBox.style.opacity = "1";
    setTimeout(() => {
        closeAlert(alertBox);
    }, 2500);
}

function closeAlert(alertBox) {
    alertBox.style.transform = "translateX(100%)";
    alertBox.style.opacity = "0";
}

function handleXedien() {
    // Render slider
    if (contentSlider) {
        let sliders = "";
        for (let i = 1; i <= numberslider; i++) {
            sliders += `
                <div class="content-slider__item">
                    <img
                        src="../imgs/slider/slider_${i}.jpg"
                        alt="slide ${i}"
                        class="content-slider__item-img"
                    />
                </div>
                `;
        }
        contentSlider.innerHTML = sliders;
    }

    // Setup slider
    $(document).ready(function () {
        $(".content-slider").slick({
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            infinite: true,
            cssEase: "linear",
            variableWidth: true,
            variableHeight: true,
            arrows: false,
        });
    });

    // Customize next and prev buttons for the slider
    $(".content-slider__prev-btn").click(function (e) {
        e.preventDefault();
        $(".content-slider").slick("slickPrev");
    });

    $(".content-slider__next-btn").click(function (e) {
        e.preventDefault();
        $(".content-slider").slick("slickNext");
    });
}

function handleItemCar(idx) {
    // Initialize selectedImage
    let selectedImage = "";

    // Create a variable for brevity
    let data = array[idx];

    // Convert numbers to localized strings
    let giaCu = Number(data.giaCu).toLocaleString("en-US");
    let giaVe = Number(data.giaVe).toLocaleString("en-US");

    // Show car information
    content.innerHTML = `
        <div style="margin-top:${(header.clientHeight / 2)}px;" class="alertBox">
            Đã đặt xe thành công !
            <span
                class="closebtn"
                onclick="this.parentElement.style.transform='translateX(100%)';"
                >&times;</span
            >
        </div>
        <div class="content__current-position">
            <a
                href="../../index.html"
                class="content__current-position__home-page"
                >Trang chủ</a
            >
            <span style="margin: 0 5px">/</span>
            <a
                href="../pages/carsPage.html"
                class="content__current-position__current-page"
                >Danh mục xe</a
            >
            <span style="margin: 0 5px">/</span>
            <a
                class="content__current-position__current-page"
                >${data.tenXe}</a
            >
        </div>
        <div class="itemCar">
            <div class="itemCar__leftcolumn">
                <div class="itemCar__leftcolumn--card">
                    
                    <div class="card-content">
                        <div class="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                        <img
                                        class="itemCar__leftcolumn--card--picture"
                                        src="${data.imgsCar[0]}"
                                    />
                                    
                                </div>
                                <div class="carousel-item">
                                    <img
                                    class="itemCar__leftcolumn--card--picture"
                                    src="${data.imgsCar[1]}"
                                    />
                                </div>
                                    <div class="carousel-item">
                                    <img
                                    class="itemCar__leftcolumn--card--picture"
                                    src="${data.imgsCar[2]}"
                                    />
                                </div>
                                <div class="carousel-item">
                                <img
                                class="itemCar__leftcolumn--card--picture"
                                src="${data.imgsCar[3]}"
                                />
                        </div>
                            </div>
                            <button class="carousel-control prev" onclick="prevSlide()">&#10094;</button>
                            <button class="carousel-control next" onclick="nextSlide()">&#10095;</button>
                            <div class="carousel-indicators">
                                <span class="indicator active" onclick="goToSlide(0)"><img src="${data.imgsCar[0]}"/></span>
                                <span class="indicator" onclick="goToSlide(1)"><img src="${data.imgsCar[1]}"/></span>
                                <span class="indicator" onclick="goToSlide(2)"><img src="${data.imgsCar[2]}"/></span>
                                <span class="indicator" onclick="goToSlide(3)"><img src="${data.imgsCar[3]}"/></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="itemCar__rightcolumn">
                <div class="itemCar__rightcolumn--card">
                    <h2>
                        ${data.tenXe}
                    </h2>
                    <p class="itemCar__rightcolumn--card--newprice">
                        Giá: ${Number(data.price).toLocaleString("en-US")} vnd
                    </p>
                    <p class="itemCar__rightcolumn--card--oldprice">
                        Giá cũ: ${giaCu} vnd
                    </p>
                    <p
                        class="itemCar__rightcolumn--card--car--item__title"
                        style="font-size: 14px"
                    >
                        <ion-icon name="speedometer-outline"></ion-icon>
                        Công suất: ${data.power}
                    </p>
                    <p
                        class="itemCar__rightcolumn--card--car--item__title"
                        style="font-size: 14px"
                    >
                        <ion-icon name="battery-charging-outline"></ion-icon>
                        Quãng đường mỗi lần sạc: ${data.range}
                    </p>
                    <p
                        class="itemCar__rightcolumn--card--car--item__title"
                        style="font-size: 14px"
                    >
                        <ion-icon name="time-outline"></ion-icon>
                        Thời gian sạc: ${data.charging_time}
                    </p>    
                    <p class="itemCar__rightcolumn--card--car--item__title" style="font-size: 14px">
                        <ion-icon name="shield-checkmark-outline"></ion-icon>
                        Bảo hành: ${data.warranty}
                    </p>
                    <p class="itemCar__rightcolumn--card--car--item__title" style="font-size: 14px">
                        <ion-icon name="car-outline"></ion-icon>
                        Số chỗ ngồi: ${data.soChongoi}
                    </p>
                    <p class="itemCar__rightcolumn--card--car--item__title" style="font-size: 14px">
                        <ion-icon name="car-sport-outline"></ion-icon>
                        Số cửa: ${data.soCua}
                    </p>
                    <p class="itemCar__rightcolumn--card--car--item__title" style="font-size: 14px">
                        <ion-icon name="resize-outline"></ion-icon>
                        Kích thước tổng thể: ${data.kichThuocTongThe}
                    </p>
                    <p
                        class="itemCar__rightcolumn--card--car--item__title"
                        style="font-size: 14px"
                    >
                        ${data.gioiThieu}
                    </p>
                    <p style="color: gold; font-size: 24px;">★ ${data.eva}</p>
                    <button data-item=${idx} class="itemCar__rightcolumn--card--btn order-btn">
                        Đặt Xe
                    </button>
                    <button data-item=${idx} class="itemCar__rightcolumn--card--btn order-btn">
                        <a target="_blank" href="https://forms.gle/3XAqbs3RbfDLQKh49">Đánh giá</a>
                    </button>
                </div>
            </div>
        </div>
        `;

    document.body.scrollIntoView({ behavior: "smooth", block: "start" });

    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            selectedImage = data.imgsCar[i];
        });
    });

    let datVe = document.querySelector(".order-btn");
    datVe.addEventListener("click", function (e
    ) {
        let orderCar = array[Number(e.target.dataset.item)];
        
        if (selectedImage) {
            orderCar.imgsCar[0] = selectedImage;
        }
        let amount = cartItems.amount;
        cartItems.items.push(orderCar);
        cartItems = {
            amount: ++amount,
            items: cartItems.items,
        };
        localStorage.setItem("cart-items", JSON.stringify(cartItems));
        showAlert();
        cartAmount.forEach((e) => {
            e.innerHTML = cartItems.amount || 0;
        });
    });
}

handleXedien();
let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    let carouselInner = document.querySelector('.carousel-inner');
    if (carouselInner) {
        document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
    }
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
    });
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentIndex);
    });
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function goToSlide(index) {
    showSlide(index);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
});


history.pushState(null,null,window.location.href)
window.addEventListener('popstate',function(e){
    this.window.location.reload()
});

