
const post = "http://localhost:3000/users";

document.getElementById("loginBtn").onclick = function login() {
    fetch(post)
    .then(res => res.json())
    .then(res => {
        let inputEmail = document.getElementById("email").value;
        let inputPassword = document.getElementById("password").value;

        // Tìm user bằng .find()
        let foundUser = res.find(user => user.email === inputEmail);

        // Nếu không tìm thấy user
        if (!foundUser) {
            Toastify({
                text: "Người dùng không tồn tại!",
                className: "error",
                style: { background: "red" }
            }).showToast();
            return; // Dừng hàm
        }

        // Nếu mật khẩu đúng
        if (inputPassword === foundUser.password) {
            Toastify({
                text: "Đăng nhập thành công!",
                className: "info",
                style: { background: "#4CAF50" }
            }).showToast();

            localStorage.setItem("email", foundUser.email);
            localStorage.setItem("id", foundUser.id);

            setTimeout(() => {
                window.location.href = "/views/home/home.html";
            }, 3000);
        } else {
            Toastify({
                text: "Sai mật khẩu!",
                className: "error",
                style: { background: "red" }
            }).showToast();
        }
    })
    .catch(err => {
        Toastify({
            text: "Lỗi kết nối đến server!",
            className: "error",
            style: { background: "red" }
        }).showToast();
        console.error("Lỗi:", err);
    });
};


document.getElementById("registerBtn").onclick = function register() {
    let newEmail = document.getElementById("emaill").value;
    let newPassword = document.getElementById("passwordd").value;
    

    if (!newEmail || !newPassword ) {
        Toastify({ text: "Vui lòng điền đầy đủ thông tin!", className: "error", style: { background: "red" }}).showToast();
        return;
    }

    // Kiểm tra xem email đã tồn tại chưa
    fetch(post)
    .then(res => res.json())
    .then(res => {
        let existingUser = res.find(user => user.email === newEmail);
        if (existingUser) {
            Toastify({ text: "Email đã tồn tại!", className: "error", style: { background: "red" }}).showToast();
            return;
        }

        // Tạo user mới
        let newUser = {
            id: users.length + 1, // Tạo ID tự động (tạm thời)
            email: newEmail,
            password: newPassword
        };

        // Gửi yêu cầu POST để lưu user mới vào JSON Server
        fetch(post, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
        .then(() => {
            Toastify({ text: "Đăng ký thành công! Hãy đăng nhập.", className: "info", style: { background: "#4CAF50" }}).showToast();
        })
        .catch(err => {
            Toastify({ text: "Lỗi khi đăng ký!", className: "error", style: { background: "red" }}).showToast();
            console.error("Lỗi:", err);
        });
    });
};