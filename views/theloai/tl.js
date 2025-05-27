const urlParams = new URLSearchParams(window.location.search);//Tạo ra một đối tượng urlParams có thể lấy giá trị từng tham số trong URL.
const typeId = urlParams.get("type");// gọi phương thức .get() để lấy giá trị của tham số tên là "type" trong URL.
const filmContainer = document.getElementById("film-container");

fetch("http://localhost:3000/posts")//lấy dữ liệu
  .then(res => res.json())//chuyển dữ liệu
  .then(data => {//làm việc với dữ liệu sau khi đã lấy được
    const filtered = data.filter(post => post.type_film_id === typeId);
    showFilms(filtered);
  });

function showFilms(films) {
  filmContainer.innerHTML = "";
  films.forEach(film => {
    filmContainer.innerHTML += `
      <div class="film">
        <div class="film-img_wrapper">
          <a href="../chitiet/ct.html?id=${film.id}">
            <img class="film-img" src="${film.image}" alt="">
          </a>
        </div>
        <h3 class="film-text">${film.title}</h3>
      </div>
    `;
  });
}
