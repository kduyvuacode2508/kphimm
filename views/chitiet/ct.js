const params = new URLSearchParams(window.location.search);
const postId = params.get('id');

fetch(`http://localhost:3000/posts/${postId}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    const container = document.getElementById('container');
    container.innerHTML = `
      <div id="container-movie">
        <section class="banner">
            <img src="${response.image}" alt="Banner phim" >
        </section>
        <section class="movie-info">
            <h1>${response.title}</h1>
            <p><strong>Thể loại:</strong> Cổ trang, Tình cảm</p>
            <p><strong>Diễn viên:</strong> Diễn viên A, Diễn viên B</p>
            <button class="watch-now">Xem ngay</button>
            <p>
              <button id="loveBtn" class="watch-heart">
                <i id="heartIcon" class="fa-solid fa-heart" style="color: red;"></i> Yêu thích
              </button>
            </p>
            <div class="list">
              <h2>Nội dung</h2>
              <p>${response.text}</p>
            </div>  
        </section>
      </div>

      <section id="videoSection" class="video-container">
        <video id="moviePlayer" controls class="video">
          <source src="${response.video}" type="video/mp4">
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
      </section>

       <section class="episode-list">
        <div class="list">
          
        </div>  
      </section>
    `;

    // ======= Xử lý nút Yêu thích =======
    const loveBtn = document.getElementById("loveBtn");
    const heartIcon = document.getElementById("heartIcon");

    loveBtn.addEventListener("click", (e) => {
      Toastify({
        text: "tim thành công",
        className: "error",
        style: { background: "red" }
      }).showToast();
      fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likes: (response.likes || 0) + 1
        })
      }).then(() => {
        e.preventDefault()
        console.log("+1")
        heartIcon.style.color = "red";
      });
    });

    // ======= Xử lý nút Xem ngay =======
    const watchNowBtn = container.querySelector(".watch-now");
    const videoSection = container.querySelector("#videoSection");
    const videoPlayer = container.querySelector("#moviePlayer");

    watchNowBtn.addEventListener("click", () => {
      videoSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        videoPlayer.play().catch((err) => {
          console.warn("Không tự động phát được do trình duyệt chặn autoplay:", err);
        });
      }, 2800);
    });

  });