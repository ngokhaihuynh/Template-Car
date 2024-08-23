document.addEventListener("DOMContentLoaded", () => {
    let submitBtn = document.querySelector(".account__submit-btn");
    let form = document.querySelector(".account__form");
    form.onsubmit = (e) => {
        e.preventDefault();
    };
    const accountUrl = "https://66599465de346625136d0a61.mockapi.io/api/v1/otodien/account";

    let dataAccount = [];
    fetch(accountUrl)
        .then((res) => res.json())
        .then((res) => {
            dataAccount = res;
        });

    function handleLogin() {
        console.log(dataAccount);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function checkEnableAccount(account) {
        let check = true;
        for (let i = 0; i < dataAccount.length; i++) {
            if (dataAccount[i].email === account.email) {
                check = false;
                break;
            }
        }
        return check;
    }

    function handleRegister() {
        let firstName = document.querySelector(".regis-first-name");
        let lastName = document.querySelector(".regis-last-name");
        let email = document.querySelector(".regis-email");
        let password = document.querySelector(".regis-password");
        let repassword = document.querySelector(".regis-repassword");
        let account = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(),
            repassword: repassword.value.trim(),
        };

        if (
            firstName.value !== "" &&
            lastName.value !== "" &&
            validateEmail(email.value) &&
            password.value.length >= 6 &&
            password.value !== "" &&
            repassword.value !== "" &&
            repassword.value === password.value
        ) {
            if (checkEnableAccount(account)) {
                firstName.value = "";
                lastName.value = "";
                email.value = "";
                password.value = "";
                repassword.value = "";
                fetch(accountUrl, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify(account),
                }).then(() => {
                    confirm("Đăng ký thành công!");
                });
            } else {
                alert("Email này đã có người đăng ký");
                email.value = "";
                email.focus();
            }
        } else {
            if (!validateEmail(email.value)) {
                email.style.borderColor = "red";
                alert("Email không đúng định dạng. Vui lòng nhập lại.");
                email.focus();
                email.addEventListener('input', () => {
                    email.style.borderColor = "";
                });
            } else if (password.value !== repassword.value) {
                repassword.style.borderColor = "red";
                alert("Mật khẩu không giống nhau");
                repassword.focus();
                repassword.addEventListener('input', () => {
                    repassword.style.borderColor = "";
                });
            }
        }
    }

    submitBtn.onclick = function () {
        let type = submitBtn.dataset.type;
        if (type === "login") {
            handleLogin();
        } else if (type === "register") {
            handleRegister();
        }
    };
});


document.addEventListener("DOMContentLoaded", function() {
    // Select all buttons with the class 'social-button'
    let socialButtons = document.querySelectorAll(".social-button");

    // Add a click event listener to each social button
    socialButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            // Prevent the default action if it's a form submission or link
            event.preventDefault();

            // Show an alert message
            alert("Tính năng này đang bảo trì, vui lòng đăng ký bằng email.");

            // Focus on the input field with the class 'regis-first-name'
            let firstNameInput = document.querySelector(".regis-first-name");
            if (firstNameInput) {
                firstNameInput.focus();
            }
        });
    });
});

