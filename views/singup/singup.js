function register(){

}
const useren = "http://localhost:3000/users"
const submibtn = document.getElementById("registerBtn")
submibtn.addEventListener('click',function(event){
    event.preventDefault()

    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let confirn = document.getElementById("confirn-password").value

    if( email.trim() ===""){
        Toastify({
            text: "Vui lòng nhập email",
            className: "error",
            style: { background: "red" }
        }).showToast();
        return;
    }

    if( password.trim() ===""){
        Toastify({
            text: "Vui lòng nhập password",
            className: "error",
            style: { background: "red" }
        }).showToast();
        return;
    }
    if( confirn.trim() ===""){
        Toastify({
            text: "Vui lòng nhập lại mật khẩu",
            className: "error",
            style: { background: "red" }
        }).showToast();
        return;
    }
    //regex: regular expression | biểu thức chính quy (định dạng chuỗi: email | password)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ //định dạng email
    //password: ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt
    const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/;
    if(emailRegex.test(email) ==false ){
        Toastify({
            text: "Vui lòng nhập lai email",
            className: "error",
            style: { background: "red" }
        }).showToast();
        return;
    }
    if(passwordRegex.test(password) ==false ){
        Toastify({
            text: "password: ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt",
            className: "error",
            style: { background: "red" }
        }).showToast();
        return;
    }
    if(password !==confirn){
        Toastify({
            text: "nhap lai dung mat khau",
            className: "error",
            style: { background: "red" }
        }).showToast();
        return;
    }

    


    fetch(useren,{
        method:'POST',
        body: JSON.stringify({
            email:email,
            password:password,
        })

    })
})