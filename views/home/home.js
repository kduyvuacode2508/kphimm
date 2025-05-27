const posts = "http://localhost:3000/posts";
let film = document.getElementById("film-container");

fetch(posts)
    .then(res => res.json())
    .then(data => {
        repfilm(data);           // Hiển thị danh sách phim
        renderTrendingTop(data); // Gọi thêm hàm hiển thị top yêu thích ở đây
    })
    .catch(error => console.error("Error fetching data:", error));

function repfilm(res) {  // Nhận res từ fetch()
    film.innerHTML = ""; // Xóa nội dung cũ trước khi thêm mới
    for (let i = 0; i < res.length; i++) {
        console.log(res[i].image,res[i].id)
        film.innerHTML += `
            <div class="film">
                <div class="film-img_wrapper">
               <a href="../chitiet/ct.html?id=${res[i].id}">   <img class="film-img" src="${res[i].image}" alt=""></a>  
                </div>
                <h3 class="film-text">${res[i].title}</h3>
            </div>
        `;
    }
}
function renderTrendingTop(res) {
    const topContainer = document.querySelector(".product-grid");
    topContainer.innerHTML = ""; // Xóa trước
  
    // Sắp xếp theo số lượt like giảm dần
    const sorted = [...res].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    const top5 = sorted.slice(0, 5);
  
    top5.forEach((film, index) => {
      topContainer.innerHTML += `
        <div class="product-card">
          <img src="${film.image}" class="product-image" alt="${film.title}">
          <div class="product-code">Top:${index + 1}</div>
        </div>
      `;
    });
  }
function duyy(){
    console.log('1')
   document.querySelector("#profile").classList.toggle("onshow")
 }
 
 
 function lokin(){
    let email = localStorage.getItem('email')
    if(email){
        console.log(email)
        let style = document.createElement("style");
        const loginContainer = document.getElementById("login")
        loginContainer.innerHTML = `
        <div id="login"onclick = "duyy()">
                <i style=" font-size: 40px;" class="fa-solid fa-circle-user"></i>
                 <div id="profile">
        
                    <div id="avtpr"> <i  class="fa-solid fa-circle-user"></i> <h6>${email}</h6></div>
                    <hr style="">
                    <div class="iconn" style="padding: 10px;"><i id="heartIcon" class="fa-solid fa-heart" style="color:whitesmoke;"></i> Yêu thích</div>
                    <div class="iconn" style="padding: 10px;"><i id="heartIcon" class="fa-solid fa-plus"  style="color:whitesmoke;"></i> Danh sách</div>
                    <div class="iconn" style="padding: 10px;"><i id="heartIcon" class="fa-solid fa-rotate-right" style="color:whitesmoke;"></i> Xem tiếp</div>
                    <div class="iconn" style="padding: 10px;"><i id="heartIcon" class="fa-solid fa-user" style="color:whitesmoke;"></i> Tài khoản</div>
                    <hr>
                    <button onclick="duyy()" id="logoutBtn">Đăng Xuất</button>
                </div>
        </div>  
        `




        
        style.innerHTML =`
        #login{
         margin-right: 20px;
           background-color: #333;
            padding: 0px 0px;
      
        
      
        }
        #login i {
        
        color: #fff ;
        }
        `
        document.head.appendChild(style);
    }
        // Xử lý đăng xuất
        document.getElementById("logoutBtn").addEventListener("click", function() {
            localStorage.clear();
            window.location.reload();
        });
     
    
 }
 lokin()
 window.addEventListener("click", () => {
    const audio = document.getElementById("mp3");
    audio.muted = false;
    audio.play().catch(err => console.error("Lỗi phát nhạc:", err));
  });
  window.addEventListener("click", () => {
    const audio = document.getElementById("mp3");
    audio.muted = false;
    audio.play();
});
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

document.getElementById("scrollToTopBtn").addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  setInterval(nextSlide, 3000); // chuyển slide sau mỗi 5 giây