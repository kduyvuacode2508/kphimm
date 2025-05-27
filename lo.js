
document.getElementById("loginbtn").onclick = function login() {
fetch(post)
.then(res => res.json())
.then(res =>{
    let inputEmail = document.getElementById("email").value
    let inputPassword = document.getElementById("password").value
     let foundUser = user.find( res => user.email === inputEmail)
     if(!foundUser){
        Toastify({
            text: "Người dùng không tồn tại!",
            className: "error",
            style: { background: "red" }
        }).showToast();
        return; // Dừng hàm
     }
     if(foundUser.password === inputPassword){
        Toastify({
            text: "đăng nhập thành công",
            className: "error",
            style: { background: "red" }
        }).showToast();
        return; // Dừng hàm
        localStorage.setItem("email",foundUser.email)
        localStorage.setItem("password",foundUser.password)
        setTimeout(()=>{
            window.location.href=""
        })
     }else{
        Toastify({
            text: "đăng nhập ko thành công",
            className: "error",
            style: { background: "red" }
        }).showToast();
     }
})
}