document.addEventListener("DOMContentLoaded", () => {
    let loginForm = document.querySelector(".form");
    loginForm.onsubmit = (e) => {
        e.preventDefault();

        let email = loginForm.querySelector("[name='email']").value.trim();
        let password = loginForm.querySelector("[name='password']").value.trim();

        if (email === "" || password === "") {
            alert("Please fill in all fields.");
            return;
        }

        const accountUrl = "https://66599465de346625136d0a61.mockapi.io/api/v1/otodien/account";

        fetch(accountUrl)
            .then((res) => res.json())
            .then((accounts) => {
                let account = accounts.find(acc => acc.email === email);

                if (account) {
                    if (account.password === password) {
                        alert("Đăng nhập thành công!");
                        localStorage.setItem('isLogin', true);
                        // Redirect to the homepage
                        window.location.href = "../../index.html";
                    } else {
                        alert("Sai mật khẩu.");
                        let inputPassword = loginForm.querySelector("input[name='password']");
                        inputPassword.style.borderColor = "red";
                        inputPassword.focus(); // Focus on the password field
                        inputPassword.addEventListener('input', () => {
                            inputPassword.style.borderColor = "";
                        });
                    }
                } else {
                    let userResponse = confirm("Gmail này chưa đăng ký tài khoản. Bạn có muốn đăng ký tài khoản không?");
                    if (userResponse) {
                        window.location.href = "./account_signup.html";
                    } else {
                        let emailInput = loginForm.querySelector("input[name='email']");
                        emailInput.focus();
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching accounts:", error);
                alert("Có lỗi xảy ra. Vui lòng thử lại.");
            });
    };
});



document.addEventListener("DOMContentLoaded", function() {
    let socialButtons = document.querySelectorAll(".social-button");

    socialButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            event.preventDefault();

            alert("Tính năng này đang bảo trì, vui lòng đăng nhập bằng email.");

            let emailInput = document.getElementById("email");
            if (emailInput) {
                emailInput.focus();
            }
        });
    });
});

